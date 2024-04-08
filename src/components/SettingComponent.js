import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPWifi } from '../constants';

const Settings = () => {

  const [username, setUsername] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [error, setError] = useState('');
  const[dataTicket, setDataTicket] = useState([]);
  const retrieveUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data) {
        setisLoggedIn(data)
      }

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    retrieveUserData();
  }, []);


  
  const handlePressInfo = () => {

    if (isLoggedIn) {


      navigation.navigate("InfoUser")
    } else {
      navigation.navigate("LoginScreen")
    }
  }

  const handleLoginLogout = async () => {
    try {
      const response = await fetch(`http://${IPWifi}:3000/logout`, {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setisLoggedIn(false)
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('userData');
        navigation.navigate('Home');
      } else {
        // Xử lý lỗi từ máy chủ
        setError(response.error);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };
  const navigation = useNavigation();
  const handlePress = (buttonName) => {
    navigation.navigate(buttonName)
  }
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={handlePressInfo}>
          <View style={[styles.sidebarItem, styles.sidebarItemLarge]}>
            <AntDesign name="user" size={28} color="black" />
            <Text style={styles.sideBarTextLarge}>Thông tin cá nhân</Text>
          </View>
        </TouchableOpacity>
        {isLoggedIn ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate("Rate")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialIcons name="star-rate" size={24} color="black" />
                <Text style={styles.sidebarText}>Đánh giá</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialIcons name="edit" size={24} color="black" />
                <Text style={styles.sidebarText}>Đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Support")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialIcons name="support-agent" size={24} color="black" />
                <Text style={styles.sidebarText}>Hỗ trợ</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity>
      <View style={[styles.sidebarItem, styles.sidebarItem]}>
        <Ionicons name="language-outline" size={24} color="black" />
        <Text style={styles.sidebarText}>Ngôn ngữ</Text>
      </View>
    </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate("TransactionHistory")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialCommunityIcons name="history" size={24} color="black" />
                <Text style={styles.sidebarText}>Lịch sử giao dịch</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginLogout}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
                <Text style={styles.sidebarText}>Đăng Xuất</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity>
            {/* Mục hiển thị khi chưa đăng nhập */}
            <TouchableOpacity onPress={() => navigation.navigate("Rate")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialIcons name="star-rate" size={24} color="black" />
                <Text style={styles.sidebarText}>Đánh giá</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Support")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialIcons name="support-agent" size={24} color="black" />
                <Text style={styles.sidebarText}>Hỗ trợ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <View style={[styles.sidebarItem, styles.sidebarItem]}>
                <MaterialCommunityIcons name="login" size={24} color="black" />
                <Text style={styles.sidebarText}>Đăng Nhập</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#B5B5B5'
  },
  sidebarItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    flexDirection: 'row',
  },
  sidebarItemLarge: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
  },
  sidebarText: {
    fontSize: 24,
    marginLeft: 20,
  },
  sideBarTextLarge: {
    fontSize: 28,
    marginLeft: 20,
  },
  mainContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 20,
  },
});

