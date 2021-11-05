import React from 'react';
import GetDogs from './Util/ApiCall';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.default}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Dog 🙃</Text>
      </View>
      <ScrollView
        style={styles.scrollStyle}
        contentInsetAdjustmentBehavior="automatic">
        <GetDogs />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#F1E0C5',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#71816D',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#342A21',
  },
  scrollStyle: {
    height: Dimensions.get('window').height,
  },
});

export default App;
