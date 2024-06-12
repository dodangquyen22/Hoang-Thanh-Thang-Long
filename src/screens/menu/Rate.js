import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from '../../components/NavigatorBottomBar';
import StarRating from '../../components/StarRating';

const ReviewScreen = () => {
    const [reviewText, setReviewText] = useState('');
    const [starCount, setStarCount] = useState(0);
    const navigation = useNavigation();

    const submitReview = () => {
        // Handle review submission
        console.log("Review Submitted:", { reviewText, starCount });
        setReviewText('');
        setStarCount(0);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.titleHeader}>Đánh giá</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Nhận xét về ứng dụng</Text>
                    <StarRating
                        rating={starCount}
                        setRating={setStarCount}
                        starSize={30}
                        starColor={'#f1c40f'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập nhận xét của bạn..."
                        value={reviewText}
                        onChangeText={text => setReviewText(text)}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.button, (!reviewText || starCount === 0) && styles.buttonDisabled]}
                        onPress={submitReview}
                        disabled={!reviewText || starCount === 0}
                    >
                        <Text style={styles.buttonText}>Gửi nhận xét</Text>
                    </TouchableOpacity>
                </View>
                <BottomButtonBar />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
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
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 28, // To offset the back icon
    },
    icon: {
        left: 10,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginTop: 50,
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#4285F4',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#a1c0f9',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReviewScreen;
