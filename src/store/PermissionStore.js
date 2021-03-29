import { BarCodeScanner } from 'expo-barcode-scanner'
import { makeAutoObservable } from 'mobx'

class PermissionStore {
  status = null

  constructor() {
    makeAutoObservable(this)
    this.initialize()
  }

  *initialize() {
    const { status } = yield BarCodeScanner.requestPermissionsAsync()

    this.status = status
  }

  get hasPermission() {
    return this.status === 'granted'
  }
}

export default PermissionStore
