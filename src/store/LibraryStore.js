import AsyncStorage from '@react-native-async-storage/async-storage'
import { uniqBy } from 'lodash'
import { autorun, flow, makeAutoObservable } from 'mobx'

class LibraryStore {
  KEY = 'items'

  items = []

  constructor() {
    makeAutoObservable(this, {
      getItems: flow,
    })

    this.getItems()

    this.disposer = autorun(() => {
      AsyncStorage.setItem(this.KEY, JSON.stringify(this.items))
    })
  }

  dispose() {
    this.disposer()
  }

  *getItems() {
    try {
      const rawValue = yield AsyncStorage.getItem(this.KEY)

      if (rawValue) {
        const items = JSON.parse(rawValue)

        this.items = items
      }
    } catch (error) {
      console.error(error)
    }
  }

  addItem(item) {
    const merged = uniqBy([...this.items, item], 'data')

    this.items = merged
  }

  removeItem(id) {
    const filtered = this.items.filter((item) => item.data !== id)

    this.items = filtered
  }
}

export default LibraryStore
