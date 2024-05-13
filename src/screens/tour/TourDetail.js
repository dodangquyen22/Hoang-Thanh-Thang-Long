import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, SafeAreaView, TextInput, Image, Dimensions, ScrollView, FlatList } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from 'react-native-image-slider-box';

import BottomButtonBar from "../../components/NavigatorBottomBar";
import SlideTour from "../../components/SlideTour.js"
import { ticketStyles } from "../../styles/globalStyles";

export default function TourDetail({ route }) {
    const item = route.params.item;
    const navigation = useNavigation();
    const handlePress = (item) => {
        const nextItem = item.nextItem;
        navigation.navigate('TourDetail', { item: nextItem });
    };

    const images = {
        image0: require('../../../assets/tour-images/tour-dem-0.jpg'),
        image1: require('../../../assets/tour-images/tour-dem-1.png'),
        image2: require('../../../assets/tour-images/tour-dem-2.jpg'),
        image3: require('../../../assets/tour-images/tour-dem-3.jpg'),
        image4: require('../../../assets/tour-images/tour-dem-4.jpg'),
    };

    const handleNextTour = (item) => {
        item = item.nextItem;
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>

            <View style={styles.contentContainer}>
                <SliderBox
                    style={styles.image}
                    images={Object.values(item.slideImage)}
                    dotColor='#dec584'
                    inactiveDotColor='#e2d7a7'
                    autoplay
                    circleLoop
                    autoplayInterval={4000}
                />
                <ScrollView style={{ marginLeft: '3%', marginRight: '3%' }}>
                    <View style={{ marginTop: '5%' }}>
                        <Text>{item.detail}</Text>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={ticketStyles.icon} onPress={() => navigation.goBack()}>
                        <Entypo name="arrow-long-left" size={50}>
                        </Entypo>
                    </TouchableOpacity>

                    {/*<TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                            <Entypo name="arrow-long-right" size={50}>
                            </Entypo>
                        </TouchableOpacity>*/}
                </View>
            </View>

            <BottomButtonBar />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        textAlign: 'center',
    },
    title: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.9,
        margin: '5%',
        marginTop: '10%',
        textAlign: 'center',
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
    },
    contentContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.75,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        backgroundColor: 'rgba(209,209,209, 0.8)',
        marginLeft: '5%',
        justifyContent: 'flex-start',
    },
    image: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.2,
        borderRadius: 20,
        margin: '2.5%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '8%',
    },
    icon: {
        textAlign: 'center',
    },
});