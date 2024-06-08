import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomButtonBar from "../../components/NavigatorBottomBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPWifi } from "../../constants";

const PurchasedTicketsScreen = ({ navigation }) => {
  const [dataTicket, setDataTicket] = useState([]);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      const parsedData = await AsyncStorage.getItem("userData");
      const username = JSON.parse(parsedData);
      const response = await fetch(`http://${IPWifi}:3001/viewTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setDataTicket(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const renderTicket = ({ item }) => (
    <View style={styles.ticketContainer}>
      <Text style={styles.eventName}>Người mua: {item.name}</Text>
      <Text style={styles.ticketDetail}>Số điện thoại: {item.phone}</Text>
      <Text style={styles.ticketDetail}>
        Số lượng vé người lớn: {item.adult}
      </Text>
      <Text style={styles.ticketDetail}>
        Số lượng vé người già/sinh viên/trẻ em: {item.child}
      </Text>
      <Text style={styles.ticketDetail}>Tổng số tiền: {item.fee} VND</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Vé đã mua</Text>
      </View>
      <View style={styles.content}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    backgroundColor: "#f9f9f9",
  },
  header: {
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
    left: 10,
    textAlign: "center",
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 32,
  },
  content: {
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  ticketList: {
    flexGrow: 1,
  },
  ticketContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ticketDetail: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default PurchasedTicketsScreen;
