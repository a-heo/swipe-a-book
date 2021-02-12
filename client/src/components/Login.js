import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text, View, TextInput, Modal, SafeAreaView, Pressable
} from 'react-native';
import { styles, text, button, modal } from '../../dist/styles';
import FrontPage from './FrontPage';

export default function Login({ userBooks, saveLogin, userId }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const logLogin = () => {
    let info = {};
    info.user = username;
    info.pw = password;
    console.log(info, 'inside logLgin in login.js')
    saveLogin(info)
      .then(setSignedIn(true))
      .then(setModalVisible(false));
  }

  console.log('login clicked', modalVisible)

  return (
    <SafeAreaView style={styles.container}>
      {signedIn ? <FrontPage userBooks={userBooks} userId={userId} username={username} /> :
      (
      <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modal.view}>
        <Text style={text.basic}>Welcome Back</Text>
        <View style={modal.formview}>
        <Text>Username:</Text>
        <TextInput
          style={modal.form} 
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder='username'
        />
        </View>
        <View style={modal.formview}>
        <Text>Password:</Text>
        <TextInput
          style={modal.form} 
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder='password'
        />
        </View>
        <Pressable 
          style={[button.main, button.close]}
          onPress={logLogin}
        >
            <Text>Login</Text>
        </Pressable>
        </View>
      </Modal>
      <StatusBar style="auto" />
      </View>
      )
      }
    </SafeAreaView>
  );
};
