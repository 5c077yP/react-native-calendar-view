import { StyleSheet, Button } from 'react-native';

import CalendarView from '../components/CalendarView';
import { Text, View } from '../components/Themed';

import { useStore } from '../context/SimpleStore';

export default function TabOneScreen() {
  const [store, setStore] = useStore();

  return (
    <View style={styles.container}>
      <Button
        title="clear events"
        onPress={() => {
          setStore({ events: [] });
        }}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <CalendarView events={store.events} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
