import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import { useState } from 'react';

export const EditUserInfoWindow = ({ user, onSaveChanges, onCancelChanges }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone.toString());

    const handleSaveChanges = () => {
        const updatedUser = { user, email, phone };
        
        onSaveChanges(updatedUser);
    };

    useEffect(() => {
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"

                />
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone"
                />

                <View style={styles.boxButton}>
                    <Button title="Save" onPress={handleSaveChanges} style={styles.button} />
                    <Button title="Cancel" onPress={onCancelChanges} style={styles.button} />
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
    }, title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    }, boxButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }, button: {
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 5,
    }
});