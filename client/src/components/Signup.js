import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text, View, TextInput, Modal, SafeAreaView, Pressable
} from 'react-native';
import { styles, text, button, modal } from '../../dist/styles';

import FrontPage from './FrontPage';

export default function Signup({ setSignup }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const saveSignup = () => {
    const newUser = {};
    newUser.user = username; 
    newUser.pw = password;
    newUser.email = email;
    newUser.zipcode = zipcode; 
    console.log(newUser, 'newUser')
    return axios.post('http://localhost:3000/api/user/new', newUser)
    .then(() => {
      saveLogin(newUser)
    })
    .catch((error) => {
      console.log(error, 'user exists or could not be saved');
    })
    .then(() => {
        setModalVisible(false);
        setSignedIn(true);
    })
};
console.log(username, 'username');
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
        <Text style={text.basic}>Sign Up</Text>
        <View style={modal.formview}>
        <Text>Username:</Text>
        <TextInput
          style={modal.form} 
          value={ username }
        //   onSubmitEditing={(event) => {}}
          onChangeText={(value) => setUsername(value)}
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
        <View style={modal.formview}>
        <Text>Email:</Text>
        <TextInput
          style={modal.form} 
          value={email}
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
          placeholder='email'
        />
        </View>
        <View style={modal.formview}>
        <Text>Zipcode</Text>
        <TextInput
          style={modal.form} 
          value={zipcode}
          onChangeText={(text) => setZipcode(text)}
          placeholder='password'
        />
        </View>
        <Pressable 
          style={[button.main, button.close]}
          onPress={saveSignup}
        >
          <Text>Sign Up</Text>
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
