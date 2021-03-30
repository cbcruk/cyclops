import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { List, Appbar } from 'react-native-paper'
import { RootContext } from './Provider'

const Books = observer(() => {
  const { library } = useContext(RootContext)

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title={`기록 (${library.items.length})`} />
        <Appbar.Action icon="cloud-sync" onPress={() => {}} />
      </Appbar.Header>
      <List.Section>
        {library.items.map((item) => (
          <List.Item
            key={item.data}
            title={item.data}
            description={item.type}
            onPress={() => library.removeItem(item.data)}
          />
        ))}
      </List.Section>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Books
