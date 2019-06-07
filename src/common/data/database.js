import { openDB } from 'idb'
import DappModel from './dapp'

const DB_NAME = 'status_discover'
const DB_STORE_DAPPS = 'store_dapps'

function open() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(DB_STORE_DAPPS, {
        keyPath: 'id',
      })
    },
  })
}

export default class Database {
  static async fetchAllDapps() {
    const result = []
    const db = await open()
    let cursor = await db.transaction(DB_STORE_DAPPS).store.openCursor()

    while (cursor) {
      result.push(Object.assign(new DappModel(), cursor.value))
      cursor = await cursor.continue()
    }
    return result
  }

  static async creditDapp(dapp) {
    const db = await open()
    await db.put(DB_STORE_DAPPS, dapp)
  }
}
