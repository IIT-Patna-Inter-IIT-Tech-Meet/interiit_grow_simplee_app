/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export const Rides = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    const getRiderDetails = async () => {
      const rider_info = await AsyncStorage.getItem('rider_data');
      const rider_data = JSON.parse(rider_info);
      setName(rider_data.name);
    }
    if(isFocused)
      getRiderDetails();
  }, [isFocused])
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <LinearGradient
        colors={['#152431', '#292929']}
        className="h-full">
        <ScrollView className="flex flex-col">
          <View className="flex-1 flex-row items-center mt-5 ml-5">
            <Image
              className="w-11 h-11 rounded-full my-2 mr-5"
              source={require('../assets/images/avatar.png')}
            />
            <View className="gap-1">
              <Text className="text-white text-lg">Welcome, {name}</Text>
            </View>
          </View>
          <View className="flex-1 m-auto mt-11">
            
            <TouchableOpacity className="flex-1 items-center flex-row justify-evenly bg-[#121417] h-32 w-11/12 rounded-xl my-5 " onPress={() => navigation.navigate('TotalRides')}>
              <View className="rounded-full bg-[#387ee847] h-24 w-24 items-center justify-center">
                <Icon name="map" size={40} color="#387EE8"></Icon>
              </View>
              <View>
                <Text className="text-white text-2xl font-semibold">160</Text>
                <Text className="text-gray-300">Total Rides Completed</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center flex-row justify-evenly bg-[#121417] h-32 w-11/12 rounded-xl my-5 " onPress={() => navigation.navigate('DeliveryAccuracy')}>
              <View className="rounded-full bg-[#387ee847] h-24 w-24 items-center justify-center">
                <Icon name="percent" size={40} color="#387EE8"></Icon>
              </View>
              <View>
                <Text className="text-white text-2xl font-semibold">89.65%</Text>
                <Text className="text-gray-300">Delivery Performance</Text>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
