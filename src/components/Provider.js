import React, { createContext } from 'react'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper'
import RootStore from '../store/RootStore'

export const RootContext = createContext()

function Provider({ children }) {
  return (
    <PaperProvider theme={DarkTheme}>
      <RootContext.Provider value={new RootStore()}>
        {children}
      </RootContext.Provider>
    </PaperProvider>
  )
}

export default Provider
