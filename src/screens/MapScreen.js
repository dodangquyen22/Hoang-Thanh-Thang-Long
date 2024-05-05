import * as React from "react";
import * as Location from "expo-location"
import * as TaskManager from 'expo-task-manager'
import {Dimensions, StyleSheet, View} from "react-native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import Landmark from "../components/Landmark";
import MapView, {Polygon, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import mapData from "../../data/mapData.json";
import mapStyle from "../../data/mapStyle.json";

const REFRESH_LOCATION_PERMISSION = 'location-permission';
let foregroundSubscription  = null;

TaskManager.defineTask(REFRESH_LOCATION_PERMISSION, async () => {

});

TaskManager.getRegisteredTasksAsync().then(r => console.log(r));

export default function MapScreen() {
  const [mapRegion, setMapRegion] = React.useState({
    ...mapData.rootCoordinate,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [location, setLocation] = React.useState(null);
  const [showsUserLocation, setShowsUserLocation] = React.useState(true);

  const startForegroundUpdate = async () => {
    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    try {
      // Start watching position in real-time
      foregroundSubscription = await Location.watchPositionAsync(
        {
          // For better logs, we set the accuracy to the most sensitive option
          accuracy: Location.Accuracy.BestForNavigation,
        },
        location => {
          setLocation(location.coords)
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to request location foreground permission');
        return;
      }
      await startForegroundUpdate();
    })();
  }, []);

  const lastRegion = React.useRef(mapRegion);
  const lastPosition = React.useRef(location);

  let landmarkNumGen = 0;
  return (
    <View style={styles.container}>
      <View style={styles.mapField}>
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation={showsUserLocation}
                 followsUserLocation={true}
                 customMapStyle={mapStyle}
                 initialRegion={mapRegion}
                 onRegionChange={(region) => {
                   lastRegion.current = region;
                   setTimeout(() => {
                     if (lastRegion.current === region)
                       setMapRegion(region)
                   }, 100);
                 }}
                 onUserLocationChange={(position) => {
                   lastPosition.current = position;
                   setTimeout(() => {
                     if (lastPosition.current === position)
                       setLocation(position)
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
              coordinates={road.map(id => mapData.roadIntersections.find((x) => x.id === id))}
              strokeWidth={0.04 / lastRegion.current.latitudeDelta}
              strokeColor="white"
            ></Polyline>)
          }
          {
            mapData.landmarks.map((landmark) =>
              <Landmark
                key={landmark.id}
                {...landmark}
                number={landmark?.marker?.number || ++landmarkNumGen}/>)
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
      <BottomButtonBar/>
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
    top: 0,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    position: "absolute",
    bottom: 40,
    width: Dimensions.get('window').width * 3 / 5,
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
});