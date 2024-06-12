import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { theme } from '../theme';
import { destinationData } from '../constants';

export default function Categories() {
  const navigation = useNavigation();
    const handlePress = (buttonName, data) => {
        console.log(data)
        console.log(buttonName)
        navigation.navigate(buttonName, data)
    }
  return (
    <View className="space-y-5">
      <View className="mx-5 flex-row justify-between items-center">
        <Text style={{fontSize: 23, color: theme.text}} className="font-semibold text-neutral-700">Các điểm di tích</Text>
        <TouchableOpacity>
            {/* <Text style={{fontSize: wp(4), color: theme.text}}>See all</Text> */}
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {
            destinationData.map((cat,index)=>{
                return (
                    <TouchableOpacity onPress={() => handlePress('Destination', {...cat})}  key={index} className="flex items-center space-y-2">
                        <Image source={{uri: cat.image}} className="rounded-3xl" style={{width: wp(50), height: wp(50)}} />
                        <Text className="text-neutral-700 font-medium" style={{fontSize: wp(3.2)}}>{cat.title}</Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}