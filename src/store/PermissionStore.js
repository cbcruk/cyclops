import { BarCodeScanner } from 'expo-barcode-scanner'
import { makeAutoObservable } from 'mobx'
import { Platform } from 'react-native'

class PermissionStore {
  status = null

  constructor() {
    makeAutoObservable(this)
    this.initialize()
  }

  *initialize() {
    if (Platform.OS !== 'web') {
      const { status } = yield BarCodeScanner.requestPermissionsAsync()

      this.status = status
    }
  }

  get hasPermission() {
    return this.status === 'granted'
  }
}

export default PermissionStore
