import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import circle from '../assets/images/Ellipse.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import {Button} from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const GOOGLE_MAPS_API_KEY = 'AIzaSyA8UHc-D4VOdkBY1Hi-SgWScoMrijBAgYg';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 300,
        marginHorizontal: 10,
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

const item = {
    id: '1',
    item: 'Milk',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    location_coordinates: {
        latitude: 25.56254,
        longitude: 84.86152,
    },
    warehouse: 'Patna Goods inventory',
    warehouse_coordinates: {
        latitude: 25.52354,
        longitude: 84.87875,
    },
    price: '100',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
}

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

export const VerifyDelivery = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [route, setRoute] = useState(null);
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 30000, maximumAge: 3600000 },
        );
    }, []);

    const handleRouteReady = route => {
        setRoute(route);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#181920]">
            <View className="flex mt-8 h-full">
                <View className="flex ml-6 align-middle ">
                    <View className="flex items-center flex-row">
                        <Image style={{ width: 20, height: 20 }} source={circle} />
                        <Text className="text-white text-lg font-semibold ml-5">{item.warehouse}</Text>
                    </View>

                    <Image source={line} width={2} height={18} style={{ marginLeft: 8}} />

                    <View className="flex items-center flex-row">
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={square}
                        />
                        <Text className="text-white text-lg font-semibold ml-5">{item.location}</Text>
                    </View>
                </View>
                {currentLocation ? (
                    <View style={styles.container}>
                        <MapView
                            style={styles.map}
                            customMapStyle={mapStyle}
                            initialRegion={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <Marker
                                key={`delivery-${item.warehouse_coordinates.latitude}-${item.warehouse_coordinates.longitude}`}
                                coordinate={item.warehouse_coordinates}
                                // onPress={() => handleOnPress(delivery)}
                                pinColor="red"

                            />
                            <Marker
                                key={`delivery-${item.location_coordinates.latitude}-${item.location_coordinates.longitude}`}
                                coordinate={item.location_coordinates}
                                // onPress={() => handleOnPress(delivery)}
                                pinColor="green"

                            />
                            <MapViewDirections
                                origin={item.warehouse_coordinates}
                                destination={item.location_coordinates}
                                optimizeWaypoints={true}
                                apikey={GOOGLE_MAPS_API_KEY}
                                mode="DRIVING"
                                strokeWidth={4}
                                strokeColor="#39FF14"
                                onReady={handleRouteReady}
                                onError={(error) => console.log(error)}
                            />
                        </MapView>
                    </View>) : null}

                <View className="flex flex-col top-[50%] ml-8 mr-8">
                    <View className="flex justify-between flex-row">
                        <Text className="text-white text-lg font-semibold">Distance</Text>
                        <Text className="text-white text-lg font-semibold">3Km</Text>
                    </View>
                    <View className="flex justify-between flex-row">
                        <Text className="text-white text-lg font-semibold">Amount to collect</Text>
                        <Text className="text-white text-lg font-semibold">Rs. 500</Text>
                    </View>

                </View>

                <View className="flex items-center top-[50%]">
                    <Button
                        className="border rounded-xl w-11/12 h-12 bg-[#04F968] mt-5">
                        <Text className="text-gray-900 text-lg">Confirm Delivery</Text>
                    </Button>
                </View>

            </View>
        </SafeAreaView>
    )
}
