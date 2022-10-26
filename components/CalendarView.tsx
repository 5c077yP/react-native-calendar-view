import { useMemo } from 'react';
import { StyleSheet, SectionList } from 'react-native';

import { Text, View } from './Themed';
import type { Event } from '../context/SimpleStore';
import { mapEventsToSortedSections } from './mapEventsToSortedSections';
import { format } from 'date-fns';

const Separator = ({ mv }: { mv?: number }) => (
  <View
    style={{ marginVertical: mv, height: 1, width: '100%' }}
    lightColor="#eee"
    darkColor="rgba(255,255,255,0.1)"
  />
);

const CalendarItem = ({ item, index }: { item: Event; index: number }) => {
  return (
    <View>
      {index === 0 && <Separator />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 6,
          marginHorizontal: 6,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <View style={{ height: 15 }}></View>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Text>{format(item.startDate, 'p')}</Text>
          <View style={{ height: 15 }}></View>
        </View>
      </View>
      <Separator />
    </View>
  );
};

export default function EditScreenInfo({ events }: { events: Event[] }) {
  const eventSections = useMemo(
    () => mapEventsToSortedSections(events),
    [events],
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={eventSections}
        keyExtractor={(item) => item.id}
        renderItem={(props) => <CalendarItem {...props} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginVertical: 10,
    color: 'red',
    fontSize: 16,
  },
});
