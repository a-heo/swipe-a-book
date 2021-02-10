import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, Modal, SafeAreaView, Pressable
} from 'react-native';
import { styles, button, modal } from '../../dist/styles';

export default function Login() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
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
        <Text>Welcome Back</Text>
        <Pressable style={button.main, button.close}>
            <Text>Login</Text>
        </Pressable>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
