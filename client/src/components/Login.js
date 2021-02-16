import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text, View, TextInput, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Pressable
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

  return (
    <View>
      {signedIn ? <FrontPage userBooks={userBooks} userId={userId} username={username} /> :
      (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // style={{ flex: 1, height: 560 }}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
      <View style={{ height: 60 }} />
      </Modal>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      )
      }
      <StatusBar style="auto" />
    </View>
  );
};
