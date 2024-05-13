import * as React from "react";
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import {Dimensions, Text, StyleSheet, View, TouchableOpacity} from "react-native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import Landmark from "../components/Landmark";
import MapView, {Polygon, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import mapData from "../../data/mapData.json";
import mapStyle from "../../data/mapStyle.json";

const REFRESH_LOCATION_PERMISSION = 'location-permission';
const INTERVAL = 5;
let foregroundSubscription  = null;

// let setLocationPermission = (state) => {
//   console.log(state.toString() + 'has not initialized');
// }

// const toggleLocationPermission = async () => {
//   try {
//     console.log('Task executed!');
//     const {status} = await Location.getForegroundPermissionsAsync();
//     if (status ==='granted') {
//       setLocationPermission(true);
//     } else {
//       setLocationPermission(false);
//     }
//     return (status === 'granted') ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
//   } catch (error) {
//     console.log(error.message);
//     return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
// }
// TaskManager.defineTask(REFRESH_LOCATION_PERMISSION, toggleLocationPermission);

// TaskManager.getRegisteredTasksAsync().then(r => console.log(r));
//
// const registerLocationPermissionRefresh = async () => {
//   try {
//     await BackgroundFetch.registerTaskAsync(REFRESH_LOCATION_PERMISSION, {
//       minimumInterval: INTERVAL,
//       startOnBoot: true,
//       stopOnTerminate: true,
//     }).then(r => console.log('Task registered!'));
//   } catch (err) {
//     console.log('Task register failed: ', err);
//   }
// }

const GPSButton = ({title, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MapScreen() {
  const [mapRegion, setMapRegion] = React.useState({
    ...mapData.rootCoordinate,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [location, setLocation] = React.useState(null);
  const [showsUserLocation, setShowsUserLocation] = React.useState(false);
  // setLocationPermission = setShowsUserLocation;

  const startForegroundUpdate = async () => {

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

  const onGPSButtonPress = async () => {
    try {
      console.log('Task executed!');
      const {granted} = await Location.getForegroundPermissionsAsync();
      console.log('Granted: ' + granted);
      console.log('showUserLocation: ' + showsUserLocation);

      if (granted && !showsUserLocation) {
        console.log('Location permission granted.');
        await startForegroundUpdate();
        setShowsUserLocation(true);
      } else if (showsUserLocation) {
        console.log('Location access turned off.');
        setShowsUserLocation(false);
      }
      return (granted) ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
      console.log(error.message);
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  }

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Failed to request location foreground permission');
          return;
        }
        // await registerLocationPermissionRefresh();
        await startForegroundUpdate();
        setShowsUserLocation(true);
      } catch (error) {
        console.log("Error requesting location permission:", error.message);
        // Handle error (e.g., show error message to the user)
      }
    })();
  }, []);

  const lastRegion = React.useRef(mapRegion);
  const lastPosition = React.useRef(location);
  let landmarkNumGen = 0;

  return (
    <>
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
      <GPSButton title={'GPS'} onPress={onGPSButtonPress}/>
    </>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 80, // Adjust this value to change vertical position
    right: 5, // Adjust this value to change horizontal position
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 2,
  },
});