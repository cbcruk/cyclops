import React, { useState } from 'react'
import { BottomNavigation as PaperBottomNavigation } from 'react-native-paper'
import Books from './Books'
import Scan from './Scan'

function BottomNavigation() {
  const [index, setIndex] = useState(0)
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'scan':
        return <Scan jumpTo={jumpTo} />
      case 'books':
        return <Books key={index} jumpTo={jumpTo} />
    }
  }

  return (
    <PaperBottomNavigation
      shifting
      navigationState={{
        index,
        routes: [
          { key: 'scan', title: 'Scan', icon: 'barcode-scan' },
          { key: 'books', title: 'Books', icon: 'book' },
        ],
      }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default BottomNavigation
