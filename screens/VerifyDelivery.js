/* eslint-disable */
import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import circle from '../assets/images/Ellipse.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import {Button} from 'react-native-paper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import haversine from 'haversine';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HOST} from '../host';
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
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const VerifyDelivery = () => {
  const route = useRoute();
  const {currentLocation, destination, id, location, delivery} = route.params;
  const navigation = useNavigation();
  const handleConfirm = async () => {
    let body = {
      itemId: id,
      delivery: delivery,
    };
    try {
      const response = await fetch(`http://${HOST}/rider/register-package`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      navigation.navigate('Home');
     
    } catch (error) {
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <View className="flex mt-8 h-full">
        <View className="flex ml-6 align-middle ">
          <View className="flex items-center flex-row mb-3">
            <Image style={{width: 20, height: 20}} source={circle} />
            <Text className="text-white text-sm font-semibold ml-5">
              Your Current Location
            </Text>
          </View>


          <View className="flex items-center flex-row">
            <Image style={{width: 20, height: 20}} source={square} />
            <Text className="text-white text-sm font-semibold ml-5">
              {location}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            provider={PROVIDER_GOOGLE}>
            <Marker
              key={`delivery-${destination.latitude}-${destination.longitude}`}
              coordinate={destination}
              pinColor="red"
            />
            <Marker
              key={`delivery-${currentLocation.latitude}-${currentLocation.longitude}`}
              coordinate={currentLocation}
              pinColor="green"
            />
            <MapViewDirections
              origin={currentLocation}
              destination={destination}
              optimizeWaypoints={true}
              apikey={GOOGLE_MAPS_API_KEY}
              mode="DRIVING"
              strokeWidth={4}
              strokeColor="#39FF14"
              onError={error => console.log(error)}
            />
          </MapView>
        </View>
        <View className="flex flex-col top-[50%] ml-8 mr-8">
          <View className="flex justify-between flex-row">
            <Text className="text-white text-lg font-semibold">Distance</Text>
            <Text className="text-white text-lg font-semibold">
              {Math.round(haversine(currentLocation, destination))}
              KM
            </Text>
          </View>
          <View className="flex justify-between flex-row">
            <Text className="text-white text-lg font-semibold">Status</Text>
            <Text className="text-white text-lg font-semibold">Paid</Text>
          </View>
        </View>
        <View className="flex items-center top-[50%]">
          <Button
            className="border rounded-xl w-11/12 h-12 bg-[#04F968] mt-5"
            onPress={handleConfirm}>
            <Text className="text-gray-900 text-lg">
              Confirm {delivery ? 'Delivery' : 'Pickup'}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
