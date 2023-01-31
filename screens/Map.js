/* eslint-disable */
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import MapViewDirections from 'react-native-maps-directions';

const styles = StyleSheet.create({
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

const GOOGLE_MAPS_API_KEY = 'AIzaSyA8UHc-D4VOdkBY1Hi-SgWScoMrijBAgYg';

const deliveries = [
  {
    latitude: 25.56254,
    longitude: 84.86152,
  },
  {
    latitude: 25.51247,
    longitude: 84.87626,
  },
  {
    latitude: 25.52354,
    longitude: 84.87875,
  },
];

const pickups = [
  {
    latitude: 25.56254,
    longitude: 84.84521,
  },
  {
    latitude: 25.51247,
    longitude: 84.8621,
  },
  {
    latitude: 25.52354,
    longitude: 84.87415,
  },
];

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
export const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [nearest, setNearest] = useState(null);
  const [delivery, setDelivery] = useState(pickups);
  const [points, setPoints] = useState([...deliveries, ...pickups]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 3600000},
    );
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    // const allPoints = [...deliveries, ...pickups];
    let nearestPoint = points[0];
    points.forEach(point => {
      if (
        haversine(currentLocation, point) <
        haversine(currentLocation, nearestPoint)
      ) {
        nearestPoint = point;
      }
    });
    setNearest(nearestPoint);
  }, [currentLocation, deliveries, pickups, points]);

  const handleRouteReady = route => {
    setRoute(route);
  };

  const handleOnPress = point => {
    // remove delivery point after delivery
    // setDelivery(delivery.filter((delivery) => delivery !== point));
    setPoints(points.filter((delivery) => delivery !== point));
    console.log(delivery)
    console.log(point);
  };
  return (
    <View style={styles.container}>
      {currentLocation && nearest ? (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* {deliveries.map((delivery) =>{console.log(delivery);)})} */}

          {points.map(delivery => (
            <Marker
              key={`delivery-${delivery.latitude}-${delivery.longitude}`}
              coordinate={delivery}
              onPress={() => handleOnPress(delivery)}
              
            />
          ))}
          {/* {delivery.map(pickup => (
            <Marker
              key={`pickup-${pickup.latitude}-${pickup.longitude}`}
              coordinate={pickup}
              pinColor={'green'}
              onPress={() => handleOnPress(pickup)}
            />
          ))} */}
          <Polyline
            coordinates={route ? route.coordinates : []}
            strokeWidth={4}
            strokeColor="#000"
          />
          {/* {console.log(currentLocation)} */}
          <Marker coordinate={currentLocation} />
          {/* <Marker coordinate={nearest} /> */}
          <MapViewDirections
            origin={currentLocation}
            destination={nearest}
            optimizeWaypoints={true}
            apikey={GOOGLE_MAPS_API_KEY}
            mode = "DRIVING"
            strokeWidth={4}
            strokeColor="#39FF14"
            onReady={handleRouteReady}
            onError={(error) => console.log(error)}
          />
        </MapView>
      ) : null}
    </View>
  );
};
