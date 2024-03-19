import React, { useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { tourData } from '../constants';

const SlideTour = () => {
    const navigation = useNavigation();
    const handlePress = (item) => {
        navigation.navigate('TourDetail', { item });
    };

    const images = {
        image0: require('../../assets/tour-images/tour-dem-0.jpg'),
        image1: require('../../assets/tour-images/tour-vn-0.jpg'),
        image2: require('../../assets/tour-images/tour-nn-0.jpg'),
        image3: require('../../assets/tour-images/elnkc-0.jpg'),
        image4: require('../../assets/tour-images/ethds-0.jpg'),
    };

    const data = tourData;
    const [item, setItem] = useState(null);

    return (
        <View style={styles.container}>
            <SliderBox
                style={styles.sliderBox}
                images={Object.values(images)}
                dotColor='#dec584'
                inactiveDotColor='#e2d7a7'
                autoplay
                circleLoop
                autoplayInterval={4000}
                onCurrentImagePressed={(index) => {
                    // console.log(`Image ${index} pressed`);
                    const selectedItem = data.find((item) => item.id === index+1);
                    // console.log(selectedItem);
                    setItem(selectedItem);
                    handlePress(selectedItem);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderBox: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.25,
        left: '5%',
        borderRadius: 16, // Adjust the border radius as needed
    },
});

export default SlideTour;
