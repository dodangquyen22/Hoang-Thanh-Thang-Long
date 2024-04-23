import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';


import { auth } from './../../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userInfor, setUserInfor] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '15785712342-k9bgo9hridhm3snak23achi1qgpnsdpm.apps.googleusercontent.com',
    androidClientId: '15785712342-b6487ks6dhhjfge93cuvdp985f36meh5.apps.googleusercontent.com',
    responseType: ResponseType.Token,
  });

  const handleGoogleLogin = async () => {
    try {
      if (request) {
        const result = await promptAsync();
        if (result.type === 'success') {
          // Create Firebase credential
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.authentication.idToken
          );
          // Sign in with Firebase
          await firebase.auth().signInWithCredential(credential);

          // Store user data, navigate, etc.
          // ... your existing logic ...
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    // Xử lý logic đăng nhập ở đây
    try {
      const response = await fetch('http://172.20.10.3:3000/login', {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        // Đăng ký thành công, chuyển đến màn hình đăng nhập
        console.log(data)
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.navigate('Home', { refresh: true });
      } else {
        // Xử lý lỗi từ máy chủ
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-outline" size={32}>
          </Ionicons>
        </TouchableOpacity>
        <Image source={require('../../../assets/logoLogin.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Button title="Đăng kí" onPress={() => navigation.navigate("SignUpScreen")} />
        <Button title="Đăng nhập với Google" onPress={handleGoogleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 999,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  // logo: {
  //   width: 250,
  //   height: 250,
  //   marginBottom: 32,
  // },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;