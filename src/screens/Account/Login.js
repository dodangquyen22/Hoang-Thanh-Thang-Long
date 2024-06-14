import React, { useState, useEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from 'react-native';
import { IPWifi } from "../../constants";

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { getApp, getAuth } from "../../../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const auth = getAuth(getApp());

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "833472590383-kllrdj1p3ejf2u52gn4tl4crnhtr6pcr.apps.googleusercontent.com",
  });

  // useEffect(() => {
  //   if (response?.type == "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);
  //
  // const getLocalUser = async () => {
  //   try {
  //     setLoading(true);
  //     const userJSON = await AsyncStorage.getItem("@user");
  //     const userData = userJSON ? JSON.parse(userJSON) : null;
  //     setUserInfo(userData);
  //   } catch (e) {
  //     console.log(e, "Error getting local user");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // useEffect(() => {
  //   getLocalUser();
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       await AsyncStorage.setItem("@user", JSON.stringify(user));
  //       console.log(JSON.stringify(user, null, 2));
  //       setUserInfo(user);
  //     } else {
  //       console.log("user not authenticated");
  //     }
  //   });
  //   return () => unsub();
  // }, []);

  useEffect(() => {
    handleSignInWIthGoogle().then(r => console.log(JSON.stringify(userInfo, null, 2)));
  }, [response])

  async function handleSignInWIthGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${IPWifi}:3001/login`, {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.navigate('Home', { refresh: true });
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} />
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
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đăng nhập</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("SignUpScreen")}>
              <Text style={styles.buttonText}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 999,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#34A853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    marginTop: 20,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default LoginScreen;