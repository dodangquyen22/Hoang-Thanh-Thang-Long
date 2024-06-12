import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function DestinationScreen(props) {
    const item = props.route.params;
    console.log(item)
    const imageSrc = item.image;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

    const description = item.longDescription;

    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const [descriptionText, setDescriptionText] = React.useState(""); 

    React.useEffect(() => {
        setDescriptionText(
            description
        );
    }, []);

    const speakText = () => {
        setIsSpeaking(true);
        Speech.speak(descriptionText, {
            pitch: 1,
            rate: 1,
            volume: 1,
            onStopped: () => setIsSpeaking(false),
            onError: () => setIsSpeaking(false),
        });
    };

    const stopText = () => {
        Speech.stop();
        setIsSpeaking(false);
    };

    const toggleSpeaking = () => {
        if (isSpeaking) {
            stopText();
        } else {
            speakText();
        }
        setIsSpeaking(!isSpeaking);
    };

  return (
    <View className="bg-white flex-1">
        {/* destination image */}
        <Image source={{ uri: `${imageSrc}` }} style={{width: wp(100), height: hp(55)}} />
        <StatusBar style={'light'} />

        {/* back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> {navigation.goBack(); stopText();}}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: '#111'}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
        </SafeAreaView>

        {/* title & descritpion & booking button */}
        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                <View className="flex-row justify-between items-start">
                    <Text style={{fontSize: wp(7)}} className="font-bold flex-1 text-neutral-700">
                        {item?.title}
                        
                    </Text>
                    <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={toggleSpeaking}>
            <FontAwesome name={isSpeaking ? "volume-down" : "volume-up"} size={24} color="black" />
          </TouchableOpacity>
            </View>
                </View>
                <Text style={{fontSize: wp(3.7), textAlign: 'justify'}} className="text-neutral-700 tracking-wide mb-2">{item?.longDescription}</Text>
                {/* <View className="flex-row justify-between mx-1">
                    <View>
                        <Text>
                            {item?.longDescription}
                        </Text>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
      },
      button: {
        backgroundColor: '#DDDDDD', // Adjust background color as needed
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 5,
      },
});