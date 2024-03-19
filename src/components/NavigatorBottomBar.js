import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, globalStylesheet, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo} from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { useNavigationState } from "@react-navigation/native";
import { color } from 'react-native-elements/dist/helpers';
import theme from '../theme';

const BottomButtonBar = () => {
    const navigation = useNavigation();
    const navigationState = useNavigationState((state) => state);
   
    const handlePress = (buttonName) => {
        navigation.navigate(buttonName)
        console.log(navigationState.routes[navigationState.index].name)
    }

    return (
        <View style={globalStyles.navigator}>

            <TouchableOpacity onPress={() => handlePress('Info')}>
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons name="information-outline" color={navigationState.routes[navigationState.index].name === 'Info' ? '#f97316' : 'gray'} size={26} />
                    <Text style={[styles.textNavigator, { color: navigationState.routes[navigationState.index].name === 'Info' ? '#f97316' : 'gray' }]}>Thông tin</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('Map')}>
                <View style={styles.buttonContainer}>
                    <Entypo name="location-pin" color={navigationState.routes[navigationState.index].name === 'Map' ? '#f97316' : 'gray'} size={26}>
                    </Entypo>
                    <Text style={[styles.textNavigator, { color: navigationState.routes[navigationState.index].name === 'Map' ? '#f97316' : 'gray' }]}>Bản đồ</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Home')}>
                <View style={styles.buttonContainer}>
                    <Octicons name="home" color={navigationState.routes[navigationState.index].name === 'Home' ? '#f97316' : 'gray'} size={26}>
                    </Octicons>
                    <Text style={[styles.textNavigator, { color: navigationState.routes[navigationState.index].name === 'Home' ? '#f97316' : 'gray' }]}>Trang chủ</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Event')}>
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons name="calendar" color={navigationState.routes[navigationState.index].name === 'Event' ? '#f97316' : 'gray'} size={26}>
                    </MaterialCommunityIcons>
                    <Text style={[styles.textNavigator, { color: navigationState.routes[navigationState.index].name === 'Event' ? '#f97316' : 'gray' }]}>Sự kiện</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Setting')}>
                <View style={styles.buttonContainer}>
                    <Icon name="bars" color={navigationState.routes[navigationState.index].name === 'Setting' ? '#f97316' : 'gray'} size={26}>
                    </Icon>
                    <Text style={[styles.textNavigator, { color: navigationState.routes[navigationState.index].name === 'Setting' ? '#f97316' : 'gray' }]}>Menu</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};

const handlePress = () => {

}


export default BottomButtonBar;

const styles = StyleSheet.create({
    textNavigator: {
        color: 'black',
        fontSize: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
})