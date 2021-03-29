import LibraryStore from './LibraryStore'
import PermissionStore from './PermissionStore'
import ScanStore from './ScanStore'

class RootStore {
  constructor() {
    this.library = new LibraryStore(this)
    this.permission = new PermissionStore(this)
    this.scan = new ScanStore(this)
  }
}

export default RootStore
