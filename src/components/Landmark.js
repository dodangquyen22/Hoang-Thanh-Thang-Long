import NumberMarker from "./Marker";
import { StyleSheet, View, Text  } from "react-native";
import { Polygon } from "react-native-maps";

function averageCoord(coords) {
  const sum = { latitude: 0, longitude: 0 };
  for (const coord of coords) {
    sum.latitude += coord.latitude;
    sum.longitude += coord.longitude;
  };
  return {
    latitude: sum.latitude / coords.length,
    longitude: sum.longitude / coords.length,
  };
}

export default function Landmark(props) {
  const markerCoord = props.marker ? 
      (props.marker.coordinate || averageCoord(props.area.coordinates)) 
      : undefined;
  const markerProps = props.marker ? 
      { ...props.marker, coordinate: markerCoord, number: props.number } 
      : undefined;
  return (
    <View>
      {props.area ? 
          <Polygon 
            zIndex={2}
            strokeWidth={0.5}
            strokeColor="grey"
            fillColor="grey"
            {...props.area} /> 
          : undefined}
      {props.marker ? <NumberMarker {...markerProps} /> : undefined}
    </View>
  );
}

// transparent container
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "rgb(119, 197, 226)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  }
})