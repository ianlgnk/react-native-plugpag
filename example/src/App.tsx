import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import {
  readRfidCardInSunmi,
  cancelRfidCardSearchInSunmi,
  initPlugpag,
} from 'react-native-sunmi-plugpag-wrapper';

export default function App() {
  const [rfid, setRfid] = React.useState<string>('');

  const scanRfid = async () => {
    try {
      setRfid('Waiting card...');
      setRfid(await readRfidCardInSunmi());
    } catch (e) {
      setRfid('Error!');
      console.error(e);
    }
  };

  const cancelScan = () => {
    try {
      cancelRfidCardSearchInSunmi();
      setRfid('');
    } catch (e) {
      console.error(e);
    }
  };

  const handleInitPlugPag = () => {
    try {
      initPlugpag('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RFID found: '{rfid}'</Text>
      <Button title="Search RFID" onPress={scanRfid} />
      <Button title="Cancel search" onPress={cancelScan} />
      <Button title="initPlugpag()" onPress={handleInitPlugPag} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});
