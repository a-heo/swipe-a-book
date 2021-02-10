import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Title from './Title.js';
import { styles } from '../../dist/styles.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Title />
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
