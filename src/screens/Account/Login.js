import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPWifi } from "../../constants";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Xử lý logic đăng nhập ở đây
    try {
      const response = await fetch(`http://${IPWifi}:3000/login`, {
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