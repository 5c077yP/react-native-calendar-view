import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Switch } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import * as Random from 'expo-random';
import { startOfDay } from 'date-fns';

import { Text, View } from '../components/Themed';
import { useAddEvent } from '../context/SimpleStore';

export default function CreateCalendarEventScreen() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const navigation = useNavigation();

  const onChangeStartDate = (_e: DateTimePickerEvent, selectedDate?: Date) => {
    selectedDate && setStartDate(startOfDay(selectedDate));
  };

  const onChangeEndDate = (_e: DateTimePickerEvent, selectedDate?: Date) => {
    selectedDate && setEndDate(startOfDay(selectedDate));
  };

  const addEvent = useAddEvent();

  const onClose = async () => {
    if (!title) {
      setTitleError(true);
      return;
    }

    const validEndData = showEndDate ? endDate : startDate;

    await addEvent({
      id: uuidv4({ random: Random.getRandomBytes(16) }),
      title,
      startDate,
      endDate: validEndData,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ flexDirection: 'row' }}>
        <Text>title:</Text>
        <TextInput
          placeholder="title"
          style={{
            marginLeft: 10,
            ...(titleError ? { borderBottomWidth: 5, borderColor: 'red' } : {}),
          }}
          onChangeText={(text) => {
            setTitle(text);
            setTitleError(false);
          }}
          value={title}
        />
      </View>

      <View style={{ flexDirection: 'column' }}>
        <Text>startDate:</Text>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={'date'}
            is24Hour={true}
            onChange={onChangeStartDate}
            display="default"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text>has end date:</Text>
        <Switch
          value={showEndDate}
          onValueChange={() => setShowEndDate((prev) => !prev)}
        />
      </View>

      {showEndDate && (
        <View style={{ flexDirection: 'column' }}>
          <Text>end date:</Text>
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeEndDate}
              minimumDate={startDate}
              display="default"
            />
          </View>
        </View>
      )}

      <Button title="create" onPress={onClose} disabled={titleError} />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
