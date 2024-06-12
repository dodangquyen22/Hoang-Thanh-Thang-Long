import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ maxStars = 5, rating, setRating, starSize = 30, starColor = '#f1c40f' }) => {
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                        name={i <= rating ? 'star' : 'star-outline'}
                        size={starSize}
                        color={starColor}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return <View style={styles.starContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
});

export default StarRating;
