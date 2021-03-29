import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import { uniqBy } from 'lodash'
import { makeAutoObservable } from 'mobx'

class LibraryStore {
  KEY = 'items'

  storage = null

  items = []

  constructor() {
    this.storage = new Storage({
      storageBackend: AsyncStorage,
    })
    this.initialize()

    makeAutoObservable(this)
  }

  *initialize() {
    const key = this.KEY

    try {
      const items = yield this.storage.load({ key })

      this.items = items
    } catch (error) {
      if (error.name === 'NotFoundError') {
        this.storage.save({ key, data: [] })
      }
    }
  }

  *fetchItems() {
    try {
      const items = yield this.storage.load({ key: this.KEY })

      this.items = items

      return items
    } catch (error) {
      console.error(error)
    }
  }

  *addItem(item) {
    const key = this.KEY

    try {
      const prev = yield this.storage.load({ key })
      const merged = uniqBy([...prev, item], 'data')

      yield this.storage.save({
        key,
        data: merged,
      })

      this.items = merged
    } catch (error) {
      console.error(error)
    }
  }
}

export default LibraryStore
