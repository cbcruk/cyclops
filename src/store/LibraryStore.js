import AsyncStorage from '@react-native-async-storage/async-storage'
import { uniqBy } from 'lodash'
import { flow, makeAutoObservable } from 'mobx'

class LibraryStore {
  KEY = 'items'

  items = []

  constructor() {
    makeAutoObservable(this, {
      getItems: flow,
      removeItem: flow,
    })
  }

  *getItems() {
    try {
      const rawValue = yield AsyncStorage.getItem(this.KEY)
      const items = JSON.parse(rawValue || '[]')

      this.items = items
    } catch (error) {
      console.error(error)
    }
  }

  *addItem(item) {
    try {
      const merged = uniqBy([...this.items, item], 'data')

      yield AsyncStorage.setItem(this.KEY, JSON.stringify(merged))

      this.items = merged
    } catch (error) {
      console.error(error)
    }
  }

  *removeItem(id) {
    try {
      const filtered = this.items.filter((item) => item.data !== id)

      yield AsyncStorage.setItem(this.KEY, JSON.stringify(filtered))

      this.items = filtered
    } catch (error) {
      console.error(error)
    }
  }
}

export default LibraryStore
