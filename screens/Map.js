/* eslint-disable */
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, { useState, useEffect} from "react";
// import  { MapView, Marker, Polyline, MapViewDirections } from "react-native-maps";
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import haversine from "haversine";

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // map: {
  //   flex: 1,
  //   height: 400,
  //   width: 400,
  // },
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  instructions: {
    fontSize: 20,
    margin: 10,
  },
});
const GOOGLE_MAPS_APIKEY = 'AIzaSyA8UHc-D4VOdkBY1Hi-SgWScoMrijBAgYg'

const deliveries = [
  {
  latitude: 37.78825,
  longitude: -122.4324,
},
{
  latitude: 37.819888,
  longitude: -122.485841,
},
{
  latitude: 37.766311,
  longitude: -122.434468,
}
];

const pickups = [
  {
  latitude: 37.790074,
  longitude: -122.419541,
},
{
  latitude: 37.779608,
  longitude: -122.401567,
},
{
  latitude: 37.770735,
  longitude: -122.465636,
}
];

export const Maps = () => {
  console.log(deliveries)
  console.log(pickups)
  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [nearest, setNearest] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 3600000 }
    );
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    const allPoints = [...deliveries, ...pickups];
    let nearestPoint = allPoints[0];
    allPoints.forEach((point) => {
      if (
        haversine(currentLocation, point) <
        haversine(currentLocation, nearestPoint)
      ) {
        nearestPoint = point;
      }
    });
    setNearest(nearestPoint);
  }, [currentLocation, deliveries, pickups]);

  const handleRouteReady = (route) => {
    setRoute(route);
  };

  const handleOnPress = (point) => {
    // remove delivery point after delivery
    setDeliveries(deliveries.filter((delivery) => delivery !== point));
  };
  return (
    <View style={styles.container}>
    <MapView
    style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
  </View>
    // <View style={styles.container}>
    //   {console.log(currentLocation) && console.log(nearest)}
    //   {currentLocation && nearest ? (
    //   <MapView
    //       style={styles.map}
    //       initialRegion={{
    //         latitude: currentLocation.latitude,
    //         longitude: currentLocation.longitude,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}
    //     >
    //       {deliveries.map((delivery) => (
    //         <Marker
    //           key={`delivery-${delivery.latitude}-${delivery.longitude}`}
    //           coordinate={delivery}
    //           onPress={() => handleOnPress(delivery)}
    //         />
    //       ))}
    //       {pickups.map((pickup) => (
    //         <Marker
    //           key={`pickup-${pickup.latitude}-${pickup.longitude}`}
    //           coordinate={pickup}
    //         />
    //       ))}
    //       <Polyline
    //         coordinates={route ? route.coordinates : []}
    //         strokeWidth={4}
    //         strokeColor="#000"
    //       />
    //       <Marker coordinate={currentLocation} />
    //       <Marker coordinate={nearest} />
    //       <MapViewDirections
    //         origin={currentLocation}
    //         destination={nearest}
    //         apikey={GOOGLE_MAPS_APIKEY}
    //         strokeWidth={4}
    //         strokeColor="#000"
    //         onReady={handleRouteReady}
    //         onError={(error) => console.log(error)}
    //       />
    //     </MapView>
    //   ) : null}
    // </View>
  );
};
