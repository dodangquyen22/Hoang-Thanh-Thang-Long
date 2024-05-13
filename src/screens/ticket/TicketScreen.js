import * as React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, SafeAreaView, TextInput, ScrollView, Linking  } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
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
    const [show, setShow] = React.useState(false)
    const [warn, setWarn] = React.useState(false);

    const [isConfirmVisible, setConfirmVisible] = React.useState(false);
    const [isRejectVisible, setRejectVisible] = React.useState(false);
    const [isHelpVisible, setHelpVisible] = React.useState(false);

    const navigation = useNavigation();

    const nameRegex = /^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$/;

    const handlePress = async (buttonName) => {
        // navigation.navigate(buttonName);
        setConfirmVisible(!isConfirmVisible);
        info.name = text;
        info.phone = phone;
        info.date = date;
        info.adult = adultTicket;
        info.child = childTicket;
        info.fee = price * adultTicket + price * childTicket / 2;

        const amount = 10000; // Số tiền đơn hàng
        const orderInfo = "test"; // Thông tin đơn hàng
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('orderInfo', orderInfo);
        try {
            const response = await fetch('http://192.168.45.7:8082/submitOrder', {
              method: 'POST',
              body: formData,
            });
        
            if (response.ok) {
              let vnpayUrl = await response.text();
              vnpayUrl = vnpayUrl.substring(9, vnpayUrl.length);

              const res = await Linking.openURL(vnpayUrl);
              if (res) {
                // wait 5s -> navigate
                setTimeout(() => {
                    navigation.navigate('SuccessTicket')
                }, 3000)
              } else {
                // Xử lý khi thanh toán không thành công
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
            if (adultTicket > 0)
                onChangeAdult(adultTicket - 1);
        } else {
            if (childTicket > 0)
                onChangeChild(childTicket - 1);
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
        <View style={ticketStyles.container}>
            <View style={ticketStyles.title}>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={40}>
                    </Ionicons>
                </TouchableOpacity>
                <Text style={ticketStyles.titleText}>Đặt vé</Text>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => toggleModal('help')}>
                    <Ionicons style={ticketStyles.icon} name="information-circle-outline" size={40}>
                    </Ionicons>
                </TouchableOpacity>
            </View>

            <ScrollView style={ticketStyles.formContainer}>
                <Text style={ticketStyles.label}>Họ và tên:</Text>
                <TextInput
                    style={ticketStyles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Nguyễn Văn A' />
                <Text style={ticketStyles.label}>Số điện thoại:</Text>
                <TextInput
                    style={ticketStyles.input}
                    onChangeText={onChangePhone}
                    value={phone}
                    keyboardType="numeric"
                    maxLength={10}
                />
                <Text style={ticketStyles.label}>Ngày tham quan:</Text>
                <TouchableOpacity style={ticketStyles.inputContainer} onPress={() => setShow(true)}>
                    <Text style={ticketStyles.inputDate}>{formatDate(date)}</Text>
                    <FontAwesome style={ticketStyles.calendar} name="calendar" size={20}></FontAwesome>

                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        style={ticketStyles.datePicker}
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display='spinner'
                        is24Hour={true}
                        onChange={onChange}
                        minimumDate={currentDate}
                    />
                )}

                <View style={ticketStyles.warning}>
                    {(warn) ? <Text style={{ color: 'red' }}>Vui lòng chọn ngày từ {formatDate(new Date())} trở đi!</Text> : <Text></Text>}
                </View>
                <View>
                    <Text style={ticketStyles.label}>Số lượng vé:</Text>
                    <View style={ticketStyles.ticketContainer}>
                        <Text style={ticketStyles.subTitle}>Vé người lớn: </Text>
                        <View style={ticketStyles.countContainer}>
                            <TouchableOpacity onPress={() => onMinusPress('adult')}>
                                <FontAwesome style={ticketStyles.countIcon} name="minus-square-o" size={18}></FontAwesome>
                            </TouchableOpacity>
                            <Text style={ticketStyles.countNumber}>{adultTicket}</Text>
                            <TouchableOpacity onPress={() => onPlusPress('adult')}>
                                <FontAwesome style={ticketStyles.countIcon} name="plus-square-o" size={18}></FontAwesome>
                            </TouchableOpacity>
                            <Text style={ticketStyles.priceStyle}>{price * adultTicket} VND</Text>
                        </View>

                    </View>
                    <View style={ticketStyles.ticketContainer}>
                        <Text style={ticketStyles.subTitle}>Vé học sinh / sinh viên / người cao tuổi: </Text>
                        <View style={ticketStyles.countContainer}>
                            <TouchableOpacity onPress={() => onMinusPress('child')}>
                                <FontAwesome style={ticketStyles.countIcon} name="minus-square-o" size={18}></FontAwesome>
                            </TouchableOpacity>
                            <Text style={ticketStyles.countNumber}>{childTicket}</Text>
                            <TouchableOpacity onPress={() => onPlusPress('child')}>
                                <FontAwesome style={ticketStyles.countIcon} name="plus-square-o" size={18}></FontAwesome>
                            </TouchableOpacity>
                            <Text style={ticketStyles.priceStyle}>{price * childTicket / 2} VND</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={ticketStyles.buttonContainer} onPress={() => handleConfirm()}>
                <Text style={ticketStyles.button}>Xác nhận</Text>
            </TouchableOpacity>

            <BottomButtonBar />

            <PopUp isVisible={isConfirmVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Xác nhận thông tin" />
                    <PopUp.Body>
                        <Text style={ticketStyles.popText}>Người đặt vé: {text}</Text>
                        <Text style={ticketStyles.popText}>Số điện thoại: {phone}</Text>
                        <Text style={ticketStyles.popText}>Thông tin vé: {adultTicket} vé người lớn + {childTicket} vé học sinh /
                            sinh viên / người cao tuổi, ngày {formatDate(date)}</Text>
                        <Text style={ticketStyles.popText}>Thành tiền: </Text>
                        <Text style={ticketStyles.strong}>{price * adultTicket + price * childTicket / 2} VND</Text>
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
                        {(text == '' || phone == '') ?
                            <Text style={ticketStyles.popText}>Vui lòng điền đầy đủ thông tin!</Text> :
                            ((nameRegex.test(text)) ? (<Text style={ticketStyles.popText}>Họ và tên không hợp lệ!</Text>) :
                                ((phone.length != 10 || phone.charAt(0) != '0') ? (<Text style={ticketStyles.popText}>Số điện thoại không hợp lệ!</Text>) :
                                    ((adultTicket <= 0 || childTicket <= 0) ? (<Text style={ticketStyles.popText}>Vui lòng chọn số lượng vé!</Text>) :
                                        (<Text style={ticketStyles.popText}>No error found!</Text>)
                                    )
                                )
                            )
                        }
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
                        <Text style={ticketStyles.popText}>Điền đầy đủ thông tin "Họ và tên", "Số điện thoại", sau đó chọn ngày tham quan và số lượng vé tương ứng</Text>
                        <Text style={ticketStyles.popText}>Lưu ý: Thanh toán vé tại quầy vé ở cổng Hoàng Thành Thăng Long.</Text>
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setHelpVisible(!isHelpVisible)} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>
        </View>
    )
};