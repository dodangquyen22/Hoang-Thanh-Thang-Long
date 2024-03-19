import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from '../../components/NavigatorBottomBar';


function ReviewScreen() {
    const [reviewText, setReviewText] = useState('');
    const navigation = useNavigation();

    // Hàm xử lý sự kiện khi người dùng nhấn nút Gửi nhận xét
    function submitReview() {
        // Gửi nhận xét đến máy chủ hoặc lưu trữ dữ liệu
        // Ở đây bạn có thể thêm mã xử lý để gửi nhận xét đến máy chủ hoặc lưu trữ dữ liệu

        // Xóa nội dung nhận xét sau khi gửi thành công
        setReviewText('');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.titleHeader}>Rate</Text>
                </View>
                <Text style={styles.title}>Nhận xét về ứng dụng</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập nhận xét của bạn..."
                    value={reviewText}
                    onChangeText={text => setReviewText(text)}
                    multiline
                />
                <Button
                    title="Gửi nhận xét"
                    onPress={submitReview}
                    disabled={!reviewText} // Không cho phép gửi nếu không có nội dung nhận xét
                />
                <BottomButtonBar />
            </View>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'relative',
    }, header: {
        position: 'absolute',
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width,
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 0,
        borderBottomWidth: 2,
        top: 0,
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height * 0.03, // Điều chỉnh marginTop để căn giữa theo chiều dọc
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -28,
    }, icon: {
        textAlign: 'center',
        marginLeft: 10,
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default ReviewScreen;