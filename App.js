import React, { useContext } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, LogBox } from 'react-native'
import { observer } from 'mobx-react-lite'
import BottomNavigation from './src/components/BottomNavigation'
import Provider, { RootContext } from './src/components/Provider'

LogBox.ignoreLogs(['Remote debugger'])

const Child = observer(() => {
  const { permission } = useContext(RootContext)

  if (!permission.hasPermission) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <BottomNavigation />
    </SafeAreaView>
  )
})

function App() {
  return (
    <Provider>
      <Child />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})

export default App
