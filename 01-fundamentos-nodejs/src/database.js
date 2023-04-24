import fs from 'node:fs/promises';

const databaseFile = new URL('../database.json', import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(databaseFile, 'utf-8')
      .then((data) => {
        this.#database =  JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databaseFile, JSON.stringify(this.#database));
  }

  select(table) {
    return this.#database[table] || [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data; 
  }
}