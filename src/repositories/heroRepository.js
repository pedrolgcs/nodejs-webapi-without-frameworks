import { readFile, writeFile } from 'node:fs/promises';

export default class HeroRepository {
  file;

  constructor({ file }) {
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file, 'utf8'));
  }

  async find() {
    return this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);
    await writeFile(this.file, JSON.stringify(currentFile));

    return {
      id: data.id,
    };
  }
}
