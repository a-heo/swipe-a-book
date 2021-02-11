import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, TextInput, Modal, SafeAreaView, Pressable
} from 'react-native';
import { styles, text, button, modal } from '../../dist/styles';
import FrontPage from './FrontPage';

export default function Login({ setLogin }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const saveLogin = () => {
    // setLogin(false);
    setModalVisible(false);
    setSignedIn(true);
};
console.log('login clicked', modalVisible)

  return (
    <SafeAreaView style={styles.container}>
      {signedIn ? <FrontPage /> :
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
          onChange={(text) => setUsername(text)}
          placeholder='username'
        />
        </View>
        <View style={modal.formview}>
        <Text>Password:</Text>
        <TextInput
          style={modal.form} 
          value={password}
          onChange={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder='password'
        />
        </View>
        <Pressable 
          style={[button.main, button.close]}
          onPress={saveLogin}
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
