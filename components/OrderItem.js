/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import circle from '../assets/images/Ellipse.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';

const OrderItem = ({item}) => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState({});

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
  const deliverBy = item.EDD.slice(0, -1).concat('+05:30');
  const time = new Date(deliverBy).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const destination = {
    latitude: item.customer.latitude,
    longitude: item.customer.longitude,
  };
  return (
    <View className="bg-[#CCCDCD4D] p-5 border rounded-2xl mt-2 mb-2 ml-4 mr-4">
      <View className="flex-1 flex-row items-center mb-2">
        <View style={{flex: 3}}>
          <View className="flex-1 flex-row items-center">
            <Image className="w-2.5 h-2.5" source={circle} />
            <Text className="text-white text-xs ml-1">
              Your Current Location
            </Text>
          </View>

          <Image source={line} className="ml-1 w-[2px] h-4" />

          <View className="flex-1 flex-row">
            <Image className="mt-1 w-3 h-3" source={square} />
            <Text className="text-white text-xs ml-1">{item.customer.address}</Text>
          </View>
        </View>

        <Text className="flex-2 font-bold text-right text-3xl text-[#fcfcfc]">
          Paid
        </Text>
      </View>

      <View className="flex-1 flex-row bg-black border rounded-lg m-3 p-3">
        <View className="flex-1 items-center">
          <Text className="text-xs text-white">Total Distance</Text>
          <Text className="font-bold text-2xl text-white">
            {Math.round(haversine(currentLocation, destination))} KM
          </Text>
        </View>
        <Text className="text-white">|</Text>
        <View className="flex-1 items-center">
          <Text className="text-xs text-white">Deliver By</Text>
          <Text className="font-bold text-2xl text-white">{time}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="flex-1 items-center justify-center ml-4 mr-4 p-3"
        onPress={() =>
          navigation.navigate('VerifyDelivery', {
            currentLocation:currentLocation,
            destination:destination,
            delivery:item.delivery,
            location:item.customer.address,
            id:item.id
          })
        }>
        <View className="flex-1 items-center flex-row">
          <Text style={{color: '#3EEF85', fontSize: 13}}>Verify Delivery </Text>
          <Text style={{color: '#3EEF85', fontSize: 20}}>{'->'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default OrderItem;
