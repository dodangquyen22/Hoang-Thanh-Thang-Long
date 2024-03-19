import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomButtonBar from '../../components/NavigatorBottomBar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PurchasedTicketsScreen = ({ navigation }) => {
  const[dataTicket, setDataTicket] = useState([]);
  const [error, setError] = useState('');

  const Ticket = async () => {
  // Xử lý logic đăng nhập ở đây
  try {
      parsedData = await AsyncStorage.getItem('userData');
      username = JSON.parse(parsedData);
      const response = await fetch('http://172.20.10.3:3000/viewTicket', {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
    });

    const data = await response.json();
    if (response.ok) {
      setDataTicket(data)
    } else {
      // Xử lý lỗi từ máy chủ
      setError(data.error);
    }
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again.');
  }
};

useEffect(() => {
Ticket();
}, [])

  const renderTicket = ({ item }) => (
    <View style={styles.ticketContainer}>
      <Text style={styles.eventName}>Người mua: {item.name}</Text>
      <Text style={styles.ticketCode}>Số điện thoại {item.phone}</Text>
      <Text style={styles.ticketCode}>Số lượng vé người lớn: {item.adult}</Text>
      <Text style={styles.ticketCode}>Số lượng vé người già/sinh viên/trẻ em: {item.child}</Text>
      <Text style={styles.ticketCode}>Tổng số tiền: {item.fee} VND</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-outline" size={32} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Vé đã mua</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={dataTicket}
          renderItem={renderTicket}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.ticketList}
        />
      </View>
      <BottomButtonBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    marginBottom: 20,
    height: Dimensions.get('window').height * 0.08,
  },
  icon: {
    marginRight: 10,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom:55
  },
  ticketList: {
    flexGrow: 1,
  },
  ticketContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketCode: {
    fontSize: 16,
  },
});

export default PurchasedTicketsScreen;