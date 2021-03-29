import { makeAutoObservable } from 'mobx'

class ScanStore {
  scanned = false

  target = null

  constructor() {
    makeAutoObservable(this)
  }

  get isScanned() {
    return this.scanned === true
  }

  setScanned(bool) {
    this.scanned = bool
  }

  handleBarCodeScanned(target) {
    this.scanned = true
    this.target = target
  }
}

export default ScanStore
