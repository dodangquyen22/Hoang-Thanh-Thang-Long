import * as React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, SafeAreaView, TextInput, ScrollView, Linking, Dimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomButtonBar from "../../components/NavigatorBottomBar";
import { PopUp } from "../../components/PopUp";
import { ticketStyles } from "../../styles/globalStyles";
import { CustomDatePicker } from "../../components/DatePicker";
import { IPWifi } from "../../constants";

export const info = {
    "name": '',
    "phone": '',
    "date": '',
    "adult": '',
    "child": '',
    "fee": ''
};

export default function TicketScreen() {
    const [text, onChangeText] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [adultTicket, onChangeAdult] = React.useState(0);
    const [childTicket, onChangeChild] = React.useState(0);
    const price = 30000;

    const currentDate = new Date();
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [warn, setWarn] = React.useState(false);

    const [isConfirmVisible, setConfirmVisible] = React.useState(false);
    const [isRejectVisible, setRejectVisible] = React.useState(false);
    const [isHelpVisible, setHelpVisible] = React.useState(false);

    const navigation = useNavigation();

    const nameRegex = /^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$/;

    const handlePress = async (buttonName) => {
        setConfirmVisible(!isConfirmVisible);
        info.name = text;
        info.phone = phone;
        info.date = date;
        info.adult = adultTicket;
        info.child = childTicket;
        info.fee = price * adultTicket + (price * childTicket / 2);

        const amount = info.fee;
        const orderInfo = "Mua vé tham quan hoàng thành";
        const formData = new FormData();
        parsedData = await AsyncStorage.getItem('userData');
        username = JSON.parse(parsedData);

        formData.append('amount', amount);
        formData.append('orderInfo', orderInfo);

        try {
            const response = await fetch(`http://${IPWifi}:8088/submitOrder`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                let vnpayUrl = await response.text();
                vnpayUrl = vnpayUrl.substring(9, vnpayUrl.length);

                const res = await Linking.openURL(vnpayUrl);
                if (res) {
                    setTimeout(() => {
                        navigation.navigate('SuccessTicket')
                    }, 3000);
                } else {
                    console.log('Payment failed');
                }
            } else {
                console.error('Submit order failed');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const toggleModal = (typeOfModal) => {
        if (typeOfModal === 'confirm') {
            setConfirmVisible(!isConfirmVisible);
        } else if (typeOfModal === 'reject') {
            setRejectVisible(!isRejectVisible);
        } else {
            setHelpVisible(!isHelpVisible);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = new Date();
        if (currentDate <= selectedDate) {
            setDate(selectedDate);
            setWarn(false);
            setShow(false);
        } else {
            setDate(currentDate);
            setWarn(true);
            setShow(false);
        }
    };

    const formatDate = (date) => {
        date = new Date(date);
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    };

    const onPlusPress = (typeOfTicket) => {
        if (typeOfTicket == 'adult') {
            onChangeAdult(adultTicket + 1);
        } else {
            onChangeChild(childTicket + 1);
        }
    };

    const onMinusPress = (typeOfTicket) => {
        if (typeOfTicket == 'adult') {
            if (adultTicket > 0) onChangeAdult(adultTicket - 1);
        } else {
            if (childTicket > 0) onChangeChild(childTicket - 1);
        }
    };

    const handleConfirm = () => {
        if (text != '' && phone != '' && (adultTicket > 0 || childTicket > 0)) {
            toggleModal('confirm');
        } else {
            toggleModal('reject');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={32}  />
                </TouchableOpacity>
                <Text style={styles.titleText}>Đặt vé</Text>
                <TouchableOpacity style={styles.icon} onPress={() => toggleModal('help')}>
                    <Ionicons name="information-circle-outline" size={32}  />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
                <Text style={styles.label}>Họ và tên:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Nguyễn Văn A'
                    placeholderTextColor="#999"
                />
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePhone}
                    value={phone}
                    keyboardType="numeric"
                    maxLength={10}
                    placeholder='0123456789'
                    placeholderTextColor="#999"
                />
                <Text style={styles.label}>Ngày tham quan:</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={() => setShow(true)}>
                    <Text style={styles.inputDate}>{formatDate(date)}</Text>
                    <FontAwesome name="calendar" size={20} color="#007AFF" />
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        style={styles.datePicker}
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display='spinner'
                        is24Hour={true}
                        onChange={onChange}
                        minimumDate={currentDate}
                    />
                )}

                <View style={styles.warning}>
                    {warn && <Text style={{ color: 'red' }}>Vui lòng chọn ngày từ {formatDate(new Date())} trở đi!</Text>}
                </View>

                <View>
                    <Text style={styles.label}>Số lượng vé:</Text>
                    <View style={styles.ticketContainer}>
                        <Text style={styles.subTitle}>Vé người lớn: </Text>
                        <View style={styles.countContainer}>
                            <TouchableOpacity onPress={() => onMinusPress('adult')}>
                                <FontAwesome name="minus-square-o" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.countNumber}>{adultTicket}</Text>
                            <TouchableOpacity onPress={() => onPlusPress('adult')}>
                                <FontAwesome name="plus-square-o" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.priceStyle}>{price * adultTicket} VND</Text>
                        </View>
                    </View>
                    <View style={styles.ticketContainer}>
                        <Text style={styles.subTitle}>Vé học sinh / sinh viên / người cao tuổi: </Text>
                        <View style={styles.countContainer}>
                            <TouchableOpacity onPress={() => onMinusPress('child')}>
                                <FontAwesome name="minus-square-o" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.countNumber}>{childTicket}</Text>
                            <TouchableOpacity onPress={() => onPlusPress('child')}>
                                <FontAwesome name="plus-square-o" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.priceStyle}>{price * childTicket / 2} VND</Text>
                        </View>
                    </View>
                </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleConfirm()}>
                <Text style={styles.button}>Xác nhận</Text>
            </TouchableOpacity>
            </ScrollView>


            <BottomButtonBar />

            <PopUp isVisible={isConfirmVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Xác nhận thông tin" />
                    <PopUp.Body>
                        <Text style={styles.popText}>Người đặt vé: {text}</Text>
                        <Text style={styles.popText}>Số điện thoại: {phone}</Text>
                        <Text style={styles.popText}>Thông tin vé: {adultTicket} vé người lớn + {childTicket} vé học sinh / sinh viên / người cao tuổi, ngày {formatDate(date)}</Text>
                        <Text style={styles.popText}>Thành tiền: </Text>
                        <Text style={styles.strong}>{price * adultTicket + (price * childTicket / 2)} VND</Text>
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setConfirmVisible(!isConfirmVisible)} />
                        <Button title="Xác nhận" onPress={() => handlePress('SuccessTicket')} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>

            <PopUp isVisible={isRejectVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Thông báo" />
                    <PopUp.Body>
                        {text == '' || phone == '' ? (
                            <Text style={styles.popText}>Vui lòng điền đầy đủ thông tin!</Text>
                        ) : nameRegex.test(text) ? (
                            <Text style={styles.popText}>Họ và tên không hợp lệ!</Text>
                        ) : phone.length != 10 || phone.charAt(0) != '0' ? (
                            <Text style={styles.popText}>Số điện thoại không hợp lệ!</Text>
                        ) : adultTicket <= 0 || childTicket <= 0 ? (
                            <Text style={styles.popText}>Vui lòng chọn số lượng vé!</Text>
                        ) : (
                            <Text style={styles.popText}>No error found!</Text>
                        )}
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setRejectVisible(!isRejectVisible)} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>

            <PopUp isVisible={isHelpVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Hướng dẫn mua vé" />
                    <PopUp.Body>
                        <Text style={styles.popText}>Điền đầy đủ thông tin "Họ và tên", "Số điện thoại", sau đó chọn ngày tham quan và số lượng vé tương ứng</Text>
                        <Text style={styles.popText}>Lưu ý: Thanh toán vé tại quầy vé ở cổng Hoàng Thành Thăng Long.</Text>
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setHelpVisible(!isHelpVisible)} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: "#f9f9f9",
    },
    title: {
        flexDirection: "row",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.08,
    width: Dimensions.get("window").width,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 30,
    },
    icon: {
        paddingHorizontal: 10,
        textAlign: "center",
    },
    titleText: {
        fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 32,
    },
    formContainer: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 10,
    },
    inputDate: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    calendar: {
        marginLeft: 10,
    },
    warning: {
        marginBottom: 10,
    },
    ticketContainer: {
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countIcon: {
        marginHorizontal: 10,
    },
    countNumber: {
        fontSize: 16,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    priceStyle: {
        marginLeft: 20,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 15,
        elevation: 2,
    },
    button: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    popText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    strong: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    datePicker: {
        width: '100%',
        backgroundColor: '#fff',
    },
});

