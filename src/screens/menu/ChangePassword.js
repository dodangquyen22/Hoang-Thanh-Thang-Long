import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from '../../components/NavigatorBottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPWifi } from "../../constants";

export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        const parsedData = await AsyncStorage.getItem('userData');
        const username = JSON.parse(parsedData);

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới nhập không khớp');
            return;
        }

        try {
            const response = await fetch(`http://${IPWifi}:3001/changePass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('Home');
            } else {
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
                <View style={styles.header}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.titleHeader}>Đổi mật khẩu</Text>
                </View>
                <View style={styles.content}>
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
                </View>
                <BottomButtonBar />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 30,
    },
    icon: {
        left: 10,
        textAlign: 'center',
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 32, // Adjust to offset the back icon
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 8,
        backgroundColor: '#4285F4',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

