import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from '../../components/NavigatorBottomBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { EditUserInfoWindow } from '../../components/EditUserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserInfoScreen() {
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const handleEditProfile = () => {
        setIsEditing(true);
    };
    let [userr, setUserr] = useState({
        avatar: require('../../../assets/images/avatar.png'),
        name: 'Nguyen Van A',
        email: 'nguyenvana@gmail.com',
        phone: '0333333333',
        birthday: '01/01/1999',
        bio: 'Một người đam mê lịch sử và khám phá văn hóa. Sinh ra và lớn lên tại Hà Nội, Việt Nam, Hà luôn có sự say mê với việc khám phá và tìm hiểu về quá khứ của nhân loại.',
    });

    const [user, setUser] = useState({});

    const getUser = async () => {
        // Xử lý logic đăng nhập ở đây
        try {
            parsedData = await AsyncStorage.getItem('userData');
            username = JSON.parse(parsedData);
            const response = await fetch('http://172.20.10.3:3000/viewInfo', {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data)
            } else {
                // Xử lý lỗi từ máy chủ
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        
        getUser();
    }, [])

    editUserInfo = async (updatedUser) => {
        username = user.username
        emailEdit = updatedUser.email
        phoneEdit = updatedUser.phone
        try {
            const response = await fetch('http://172.20.10.3:3000/changeInfo', {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, emailEdit, phoneEdit }),
            });
            getUser();
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setUser(data)
            } else {
                // Xử lý lỗi từ máy chủ
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    }
    handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={handleBack}>
                    <Ionicons style={styles.icon} name="arrow-back" size={32}>
                    </Ionicons>
                </TouchableOpacity>
                <View>
                    <Text style={styles.titleHeader}>Thông tin cá nhân</Text>
                </View>
            </View>

            {isEditing ? (
                <EditUserInfoWindow
                    user={user}
                    onSaveChanges={updatedUser => {
                        // Logic to save the changes made by the user
                        setUser(updatedUser);
                        editUserInfo(updatedUser)
                        setIsEditing(false); 
                        
                    }}
                    onCancelChanges={() => setIsEditing(false)}
                />
            ) : (
                <View style={styles.content}>
                    <Image
                        source={userr.avatar}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{user.username}</Text>
                    <View style={styles.phoneBox}>
                        <MaterialCommunityIcons name="email" size={20}>
                        </MaterialCommunityIcons>
                        <Text style={styles.phone}>{user.email}</Text>
                    </View>
                    <View style={styles.phoneBox}>
                        <FontAwesome name="phone" size={20}>
                        </FontAwesome>
                        <Text style={styles.phone}>{user.phone}</Text>
                    </View>
                    <Text style={styles.bio}>
                        {userr.bio}
                    </Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Sửa thông tin người dùng</Text>
                    </TouchableOpacity>
                </View>
            )}


            <BottomButtonBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 20,
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
        flex: 1,
        marginLeft: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 40,
    }, icon: {
        textAlign: 'center',
        marginLeft: 5
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        textAlign: 'center',
    },
    content: {
        top: 0,
    }, phoneBox: {
        flexDirection: 'row',
        marginBottom: 10,
    }, phone: {
        marginLeft: 20,
        fontSize: 16,
        marginBottom: 10,
    }, birthday: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
    }, email: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    }, editButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});