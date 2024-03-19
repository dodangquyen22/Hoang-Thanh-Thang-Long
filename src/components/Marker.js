import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

function NumberMarker({ number, ...props}) {
  return (
    <Marker anchor={{x: 0.5, y: 0.5}} {...props}> 
      <View style={styles.container}>
        <Text style={styles.text}>{number}</Text>
      </View>
    </Marker>
  );
}

export default NumberMarker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(119, 197, 226)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  }
})