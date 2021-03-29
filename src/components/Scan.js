import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Snackbar } from 'react-native-paper'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { RootContext } from './Provider'

const Scan = observer(() => {
  const { library } = useContext(RootContext)
  const scanObservable = useLocalObservable(() => ({
    scanned: false,
    target: null,
    setScanned(scanned) {
      this.scanned = scanned
    },
    handleBarCodeScanned(target) {
      this.scanned = true
      this.target = target
    },
  }))
  const { scanned, setScanned, handleBarCodeScanned, target } = scanObservable

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
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
        <Text onPress={() => setScanned(false)}>{target?.data}</Text>
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
