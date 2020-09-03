import { openDB } from 'idb';
import { DB_TABLES } from 'utils/constants';
import { IDapp } from 'domain/Dapps/types';

function open() {
  return openDB(DB_TABLES.DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(DB_TABLES.DB_STORE_DAPPS, {
        keyPath: 'id',
      });
    },
  });
}

export const fetchAllDappsDB = async () => {
  const result: IDapp[] = [];
  const db = await open();
  let cursor = await db
    .transaction(DB_TABLES.DB_STORE_DAPPS)
    .store.openCursor();

  while (cursor) {
    // TODO: investigate this
    // result.push(Object.assign(new DappModel(), cursor.value))
    cursor = await cursor.continue();
  }
  return result;
};

export const storeDappDB = async (dapp: IDapp) => {
  const db = await open();
  await db.put(DB_TABLES.DB_STORE_DAPPS, dapp);
};
