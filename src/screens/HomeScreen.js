import React, { useState, useEffect } from "react";
import { 
    View, Text, TouchableOpacity, Button, StyleSheet, Image, Dimensions, 
    SafeAreaView, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput 
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import SearchBar from "../components/Search";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SlideImage from "../components/SlideImage";
import Categories from "../components/categories";
import { theme } from '../theme';
import { historySearch } from '../constants';

export default function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const handleSearch = (value) => {
        setClicked(true)
    
        const results = historySearch.filter((item) => {
            const titleItem = removeDiacritics(item.title);
            const valueTitle = removeDiacritics(value);
            return titleItem.toLowerCase().includes(valueTitle.toLowerCase());
        });
    
        setSearchResults(results);
    };

    const retrieveUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            const logined = await AsyncStorage.getItem('isLoggedIn');
            if (data) {
                const parsedData = JSON.parse(data);
                setUserData(parsedData);
                setisLoggedIn(logined);
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const reloadListener = setInterval(retrieveUserData, 1000); // Refresh every second

        return () => clearInterval(reloadListener); // Cleanup: Clear the interval when the component unmounts
    }, []);

    const handlePress = (buttonName) => {
        navigation.navigate(buttonName);
    };

    const checkTicket = () => {
        if (isLoggedIn) {
            navigation.navigate("Ticket");
        } else {
            navigation.navigate("LoginScreen");
        }
    };

    const checkWithoutFeedBack = () => {
        setClicked(false);
        Keyboard.dismiss();
    };

    const checkLogin = () => {
        if (userData != null) {
            navigation.navigate('InfoUser');
        } else {
            navigation.navigate('LoginScreen');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={checkWithoutFeedBack}>
            <SafeAreaView style={globalStyles.container}>
                <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.imageField}>
                        <View style={styles.header}>
                            <Text style={styles.greetingText}>{userData ? `Xin chào ${userData}` : 'Xin chào'}</Text>
                            <TouchableOpacity onPress={checkLogin}>
                                <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchBox}>
                                <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                                <TextInput
                                    placeholder='Tìm kiếm cổ vật'
                                    placeholderTextColor={'gray'}
                                    style={styles.searchInput}
                                    onFocus={() => handleSearch("")}
                                    onBlur={() => setClicked(true)}
                                    onChangeText={text => handleSearch(text)}
                                    onSubmitEditing={() => {
                                        if (searchResults.length > 0) {
                                            navigation.navigate("Destination", searchResults[0]);
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.slideImage}>
                            {clicked && searchResults.length > 0 && (
                                <View style={styles.recommendationsBox}>
                                    {searchResults.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                navigation.navigate("Destination", item);
                                                setClicked(false);
                                            }}
                                            style={styles.recommendation}
                                        >
                                            <Text style={styles.recommendationText}>{item.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                            <SlideImage />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Categories />
                        <View>
                            <Text style={styles.serviceTitle}>Dịch vụ</Text>
                            <View style={styles.service}>
                                <TouchableOpacity onPress={checkTicket}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={require("../../assets/images/ticket-icon.png")}
                                            style={styles.image}
                                        />
                                        <Text style={styles.text}>Mua vé</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('Tour')}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={require("../../assets/images/icon-tour.png")}
                                            style={styles.image}
                                        />
                                        <Text style={styles.text}>Tour</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomButtonBar />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
    },
    imageField: {
        top: 10,
        shadowColor: '#202020',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        backgroundColor: 'white',
        marginBottom: 10,
        position: 'relative',
    },
    header: {
        paddingTop: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    greetingText: {
        fontSize: wp(7),
        fontWeight: 'bold',
        color: '#333',
    },
    avatar: {
        height: wp(12),
        width: wp(12),
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    slideImage: {
        justifyContent: 'center',
    },
    recommendationsBox: {
        position: 'absolute',
        top: -10,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 999,
        opacity: 0.97,
    },
    recommendation: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    recommendationText: {
        fontSize: 16,
        color: '#333',
    },
    content: {
        marginTop: 20,
        paddingBottom: 100,
    },
    serviceTitle: {
        fontSize: 23,
        color: theme.text,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: '600',
    },
    service: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: wp(18),
        height: wp(18),
        tintColor: 'black',
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
});

