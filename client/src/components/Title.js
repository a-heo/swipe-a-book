import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles, button } from '../../dist/styles';
import Login from './Login';


export default function Title() {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);
  
  return (
      <View>
      {login ? <Login styles={styles} /> : 
      (
    <View style={styles.container}>
      <Text style={styles.logo}>Swipe A Book</Text>
      <Text style={styles.text}>Cause sometimes you just don't have time</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {setLogin(true)}}>
        <Text style={[button.main, button.open]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSignup(true)}}>
        <Text style={[button.main, button.open]}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
      )
      }
      </View>
  );
}
