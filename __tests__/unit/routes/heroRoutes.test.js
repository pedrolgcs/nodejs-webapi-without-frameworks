import test from 'node:test';
import assert from 'node:assert';
import { heroRoutes } from '../../../src/routes/heroRoutes.js';
import { DEFAULT_HEADER } from '../../../src/utils/http.js';

const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());

test('Hero routes - endpoint test suite', async (t) => {
  await t.test('it should be able to call /heroes:get route', async () => {
    const databaseMock = [
      {
        id: '78b59be0-91ea-4d6a-b97c-fc3903a42417',
        name: 'Batman',
        age: 50,
        power: 'rich',
      },
    ];

    const heroServiceStub = {
      find: async () => databaseMock,
    };

    const endpoints = heroRoutes({ heroService: heroServiceStub });

    const request = {};
    const response = {
      writeHead: callTracker.calls((code, header) => {
        assert.strictEqual(200, code);
        assert.deepStrictEqual(DEFAULT_HEADER, header);
      }),
      end: callTracker.calls((item) => {
        const expected = JSON.stringify(databaseMock);

        assert.strictEqual(item, expected);
      }),
    };

    await endpoints['/heroes:get'](request, response);
  });

  await t.todo('it should be able to call /heroes:post route');
});
