import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomButtonBar from '../../components/NavigatorBottomBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';

function SupportScreen() {
    // Hàm xử lý sự kiện khi người dùng nhấn vào nút gọi hotline
    function callHotline() {
        const hotlineNumber = '0123456789'; // Số hotline bạn muốn gọi
        Linking.openURL(`tel:${hotlineNumber}`);
    }
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={32}>
                    </Ionicons>
                </TouchableOpacity>
                <View>
                    <Text style={styles.titleHeader}>Hỗ trợ</Text>
                </View>
            </View>

            <Text style={styles.description}>
                Liên hệ với chúng tôi qua hotline để được hỗ trợ.
            </Text>
            <Button
                title="Gọi hotline: 08866886688"
                onPress={callHotline}
            />
            <BottomButtonBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
    }, icon: {
        textAlign: 'center',
    }, titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 125,
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
    }, title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 125,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default SupportScreen;