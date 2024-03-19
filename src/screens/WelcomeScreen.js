import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      {/* Ảnh nền */}
      <Image
        source={require("../../assets/images/welcome.png")}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />

      {/* Nội dung và gradient */}
      <View style={{ padding: 20, paddingBottom: 40 }}>
        <LinearGradient
          colors={["transparent", "rgba(3,105,161,0.8)"]}
          style={{
            width: wp("100%"),
            height: hp("60%"),
            position: "absolute",
            bottom: 0
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={{ marginTop: "auto", marginBottom: 20 }}>
          <Text
            style={{ color: "white", fontWeight: "bold", fontSize: wp(10)}}
          >
            Khám phá
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: wp(7)
            }}
          >
            Hoàng Thành Thăng Long
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: theme.bg(1),
            alignItems: "center",
            padding: 10,
            borderRadius: 999
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", fontSize: wp(5.5) }}
          >
            Let's go
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
