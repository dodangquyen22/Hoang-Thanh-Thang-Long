import { de } from 'date-fns/locale';
import React, { useState } from 'react';
import BottomButtonBar from '../../components/NavigatorBottomBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        parsedData = await AsyncStorage.getItem('userData');
        username = JSON.parse(parsedData);

        if (newPassword !== confirmPassword) {
          setError('Mật khẩu mới nhập không khớp');
          return;
        }
        
        try {
          const response = await fetch('http://172.20.10.3:3000/changePass', {
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,oldPassword,newPassword}),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            // console.log(data)
            // Đăng ký thành công, chuyển đến màn hình đăng nhập
            navigation.navigate('Home');
          } else {
            // Xử lý lỗi từ máy chủ
            setError(data.error);
          }
        } catch (error) {
          console.error(error);
          setError('An error occurred. Please try again.');
        }
      };

    // const handleChangePassword = () => {
    //     // Perform password change logic here
    //     // Validate oldPassword, newPassword, and confirmPassword
    //     // Update password in your app's database or perform necessary actions
    // };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={32}>
                    </Ionicons>
                </TouchableOpacity>
                <View>
                    <Text style={styles.titleHeader}>Đổi mật khẩu</Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <BottomButtonBar />
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
    }, header: {
        position: 'absolute',
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width * 0.98,
        marginTop: 30,
        marginLeft: 5,
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 0,
        borderBottomWidth: 2,
        top: 0,
    }, titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 125,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 40,
    }, icon: {
        textAlign: 'center',
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 16,
      },
});