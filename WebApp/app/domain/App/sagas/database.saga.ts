import { openDB } from 'idb'
import { DB_TABLES } from 'utils/constants'

function open() {
  return openDB(DB_TABLES.DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(DB_TABLES.DB_STORE_DAPPS, {
        keyPath: 'id',
      })
    },
  })
}
