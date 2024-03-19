import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import NumberMarker from "../components/Marker";
import Landmark from "../components/Landmark";
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
import { Button } from "react-native-elements";
import mapData from "../../data/mapData.json";
import mapStyle from "../../data/mapStyle.json";

export default function MapScreen() {
    const navigation = useNavigation();
    const [mapRegion, setMapRegion] = React.useState({
        ...mapData.rootCoordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [markLocation, setMarkLocation] = React.useState(mapData.rootCoordinate);
    const lastRegion = React.useRef(mapRegion);
    let landmarkNumGen = 0;
    return (
        <View style={styles.container}>
            <View style={styles.mapField}>
                <MapView style={styles.map}
                  customMapStyle={mapStyle}
                  initialRegion={mapRegion}
                  // region={mapRegion}
                  onRegionChange={(region) => {
                      lastRegion.current = region;
                      setTimeout(() => {
                        if (lastRegion.current == region)
                          setMapRegion(region)
                      }, 100);
                  }}>
                    <Polygon 
                      coordinates={mapData.citadelRegion}
                      strokeWidth={2}
                      strokeColor="orange">
                    </Polygon>
                    {
                    mapData.roads.map((road, index) => <Polyline
                        key={index}
                        coordinates={road.map(id => mapData.roadIntersections.find((x) => x.id == id))}
                        strokeWidth={0.04 / lastRegion.current.latitudeDelta}
                        strokeColor="white"
                      ></Polyline>)
                    }
                    {
                    mapData.landmarks.map((landmark) => 
                      <Landmark 
                        key={landmark.id} 
                        {...landmark} 
                        number={landmark?.marker?.number || ++landmarkNumGen} />)
                    }
                    {
                    mapData.campuses.map((campus, index) => <Polygon
                        key={index}
                        zIndex={-3}
                        coordinates={campus}
                        strokeWidth={1}
                        strokeColor="grey"
                        fillColor="rgb(240,240,200)">
                      </Polygon>)
                    }
                </MapView>
            </View>
            <BottomButtonBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    mapField: {
        position: 'absolute',
        top:0,
    }, 
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    text: {
        position: "absolute",
        bottom: 40,
        width: Dimensions.get('window').width *3 / 5,
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    }, 
});