import axios from 'axios';

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles, button } from '../../dist/styles';
import Login from './Login';
import Signup from './Signup';


export default function Title() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [userId, setUserId] = useState('');
  const [userBooks, setUserBooks] = useState([]);
  
  const getUserBooks = (userInfo) => {
    return axios.get('http://localhost:3000/api/user/books', {params: userInfo})
      .then((response) => {
        setUserBooks(response.data);
      })
      .catch((error) => {
        console.log(error, 'couldn\'t retrieve books for user');
      })
  }

  const saveLogin = (userInfo) => {
    // setLogin(false);
    console.log(userInfo, 'savelogin info');
    return axios.get('http://localhost:3000/api/user', {params: userInfo})
      .then((response) => {
        setUserId(response.data[0].id);
      })
      .catch((error) => {
        console.log(error, 'unable to save userinfo');
      })
      .then(getUserBooks(userInfo))
  };

  return (
      <View>
      {login ? <Login saveLogin={saveLogin} userId={userId} userBooks={userBooks} /> :
      signup ? <Signup setSignup={setSignup}/> :
      (<View style={styles.container}>
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
