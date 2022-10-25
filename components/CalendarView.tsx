import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import type { Event } from '../context/SimpleStore';

export default function EditScreenInfo({ events }: { events: Event[] }) {
  return (
    <View style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.event}>
          <Text>{event.id}</Text>
          <Text>{event.title}</Text>
          <Text>{event.startDate.toLocaleString()}</Text>
          <Text>{event.endDate?.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  event: {
    flex: 1,
  },
});
