import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Snackbar } from 'react-native-paper'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { runInAction } from 'mobx'
import { RootContext } from './Provider'

const Scan = observer(() => {
  const { permission, library } = useContext(RootContext)
  const scanObservable = useLocalObservable(() => ({
    scanned: false,
    target: null,
    setScanned(scanned) {
      this.scanned = scanned
    },
    async handleBarCodeScanned(target) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${target.data}`
      )
      const data = await response.json()
      const [book] = data.items

      runInAction(() => {
        this.scanned = true
        this.target = { ...target, book }
      })
    },
  }))
  const { scanned, setScanned, handleBarCodeScanned, target } = scanObservable

  return (
    <View style={styles.container}>
      {permission.hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Snackbar
        visible={scanned}
        duration={Infinity}
        onDismiss={() => setScanned(false)}
        action={{
          label: '추가',
          onPress() {
            library.addItem(target)
          },
        }}
      >
        <Text onPress={() => setScanned(false)}>
          {target?.data} - {target?.book?.volumeInfo?.title}
        </Text>
      </Snackbar>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Scan
