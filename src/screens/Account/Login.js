import React, { useState, useEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPWifi } from "../../constants";

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
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
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(getApp());

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "15785712342-b6487ks6dhhjfge93cuvdp985f36meh5.apps.googleusercontent.com",
    iosClientId: "15785712342-k9bgo9hridhm3snak23achi1qgpnsdpm.apps.googleusercontent.com",
    expoClientId: "15785712342-9seersljt4fogjdq2vbe71lq72u7vjqc.apps.googleusercontent.com",
  });

  //IOS: 15785712342-k9bgo9hridhm3snak23achi1qgpnsdpm.apps.googleusercontent.com
  //Android: 15785712342-b6487ks6dhhjfge93cuvdp985f36meh5.apps.googleusercontent.com

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);

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
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
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
      <TouchableOpacity
        style={{
          backgroundColor: "#4285F4",
          width: "90%",
          padding: 10,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          marginTop: 80,
          marginBottom: 150,
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" />
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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