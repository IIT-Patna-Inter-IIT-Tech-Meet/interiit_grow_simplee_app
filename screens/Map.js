/* eslint-disable */
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, { useState, useEffect} from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  instructions: {
    fontSize: 20,
    margin: 10,
  },
});
const GOOGLE_MAPS_APIKEY = 'AIzaSyA8UHc-D4VOdkBY1Hi-SgWScoMrijBAgYg'

export const Maps = ({ deliveries, pickups }) => {
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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
      {currentLocation && nearest ? (
      <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {deliveries.map((delivery) => (
            <Marker
              key={`delivery-${delivery.latitude}-${delivery.longitude}`}
              coordinate={delivery}
              onPress={() => handleOnPress(delivery)}
            />
          ))}
          {pickups.map((pickup) => (
            <Marker
              key={`pickup-${pickup.latitude}-${pickup.longitude}`}
              coordinate={pickup}
            />
          ))}
          <Polyline
            coordinates={route ? route.coordinates : []}
            strokeWidth={4}
            strokeColor="#000"
          />
          <Marker coordinate={currentLocation} />
          <Marker coordinate={nearest} />
          <MapViewDirections
            origin={currentLocation}
            destination={nearest}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="#000"
            onReady={handleRouteReady}
            onError={(error) => console.log(error)}
          />
        </MapView>
      ) : null}
    </View>
  );
};
