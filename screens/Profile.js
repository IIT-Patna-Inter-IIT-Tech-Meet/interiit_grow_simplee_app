/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST} from './host';

export const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [UserId, setUserId] = useState('');

  useEffect(() => {
    const getRiderDetails = async () => {
      const rider_info = await AsyncStorage.getItem('rider_data');
      const rider_data = JSON.parse(rider_info);
      setName(rider_data.name);
      setEmail(rider_data.email);
    };
    if (isFocused) getRiderDetails();
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://${HOST}/rider/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        await CookieManager.clearAll();
        AsyncStorage.removeItem('rider_data');
        navigation.navigate('Login');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <ScrollView className="flex flex-col p-4 mb-28 bg-[#181920]">
        <View className="flex-1 flex-row items-center justify-evenly">
          <Image
            className="w-24 h-24 rounded-full my-2"
            source={require('../assets/images/avatar.png')}
          />
          <View className="gap-1">
            <Text className="text-white text-2xl font-bold">{name}</Text>
            <Text className="text-white text-l ">{email}</Text>
            <TouchableOpacity
              className="flex-1 align-middle items-center flex-row"
              onPress={() => navigation.navigate('EditProfile')}>
              <Text className="text-[#C0C0C0] text-l ">Edit Profile</Text>
              <Icon name="chevron-right" size={17} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-10">
          <TouchableOpacity
            className="flex-1 flex-row items-center my-5"
            onPress={() => navigation.navigate('RecentDelivery')}>
            <Text className="text-white text-xl w-11/12">
              Recent Deliveries
            </Text>
            <Icon name="compass" size={24} color="#ffffff"></Icon>
          </TouchableOpacity>
          <View className="border-b border-[#c0c0c0]"></View>
          <TouchableOpacity
            className="flex-1 flex-row items-center my-5"
            onPress={() => navigation.navigate('CustomerSupport')}>
            <Text className="text-white text-xl w-11/12">Customer Support</Text>
            <Icon name="phone-call" size={24} color="#ffffff"></Icon>
          </TouchableOpacity>
          <View className="border-b border-[#c0c0c0]"></View>
          <TouchableOpacity
            className="flex-1 flex-row items-center my-5"
            onPress={() => navigation.navigate('Privacy')}>
            <Text className="text-white text-xl w-11/12">Privacy</Text>
            <Icon name="shield" size={24} color="#ffffff"></Icon>
          </TouchableOpacity>
          <View className="border-b border-[#c0c0c0]"></View>
        </View>
        <View className="flex-1 items-center">
          <TouchableOpacity
            onPress={handleLogout}
            className="border-2 py-3 rounded-xl align-middle items-center mt-44 w-11/12 bg-[#181920] border-[#04F968]">
            <Text className="text-[#04F968] text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
