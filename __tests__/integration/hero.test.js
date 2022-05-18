import { writeFile } from 'fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

const config = {
  port: 9000,
  url: `http://localhost:${9000}/heroes`,
  databasePath: join(
    dirname(fileURLToPath(import.meta.url)),
    '../../database/data.json'
  ),
};

test('Hero Integration Test Suit', async (t) => {
  process.env.PORT = config.port;
  const { server } = await import('../../src/index.js');

  async function beforeEach() {
    return writeFile(config.databasePath, JSON.stringify([]));
  }

  async function beforeAll() {
    await writeFile(config.databasePath, JSON.stringify([]));
    return promisify(server.close.bind(server))();
  }

  await t.test('it should be able to create a hero', async () => {
    await beforeEach();

    const data = {
      name: 'Batman',
      age: 50,
      power: 'rich',
    };

    const sut = await fetch(config.url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const response = await sut.json();

    assert.deepStrictEqual(sut.headers.get('content-type'), 'application/json');
    assert.strictEqual(sut.status, 201);
    assert.deepStrictEqual(response.success, 'User created with success');
    assert.ok(response.id.length > 30);
  });

  await t.test('it should be able to list a heroes', async () => {
    await beforeEach();

    //inset hero in database
    await writeFile(
      config.databasePath,
      JSON.stringify([
        {
          id: '78b59be0-91ea-4d6a-b97c-fc3903a42417',
          name: 'Batman',
          age: 50,
          power: 'rich',
        },
      ])
    );

    const expected = [
      {
        id: '78b59be0-91ea-4d6a-b97c-fc3903a42417',
        name: 'Batman',
        age: 50,
        power: 'rich',
      },
    ];

    const sut = await fetch(config.url, {
      method: 'GET',
    });

    const response = await sut.json();

    assert.deepStrictEqual(response, expected);
  });

  await beforeAll();
});
