import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomButtonBar from '../../components/NavigatorBottomBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';

const SupportScreen = () => {
    const navigation = useNavigation();

    const callHotline = () => {
        const hotlineNumber = '0123456789'; // Số hotline bạn muốn gọi
        Linking.openURL(`tel:${hotlineNumber}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={32} />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Hỗ trợ</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Liên hệ với chúng tôi qua hotline để được hỗ trợ.
                </Text>
                <TouchableOpacity style={styles.hotlineButton} onPress={callHotline}>
                    <Text style={styles.hotlineText}>Gọi hotline: 08866886688</Text>
                </TouchableOpacity>
            </View>
            <BottomButtonBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 60,
    },
    header: {
        position: 'absolute',
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.07,
        width: Dimensions.get('window').width,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 40,
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
        marginRight: 32, // To offset the back icon
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    description: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    hotlineButton: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#4285F4',
        alignItems: 'center',
        width: '100%',
    },
    hotlineText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SupportScreen;
