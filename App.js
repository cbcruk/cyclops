import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, LogBox } from 'react-native'
import BottomNavigation from './src/components/BottomNavigation'
import Provider from './src/components/Provider'

LogBox?.ignoreLogs(['Remote debugger'])

function App() {
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <BottomNavigation />
      </SafeAreaView>
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
