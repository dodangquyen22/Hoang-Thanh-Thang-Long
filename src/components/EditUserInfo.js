import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export const EditUserInfoWindow = ({ user, onSaveChanges, onCancelChanges }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone.toString());

    const handleSaveChanges = () => {
        const updatedUser = { ...user, email, phone };
        onSaveChanges(updatedUser);
    };

    useEffect(() => { }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Chỉnh sửa thông tin</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone"
                />

                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSaveChanges} color="#4285F4" />
                    <Button title="Cancel" onPress={onCancelChanges} color="#EA4335" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
