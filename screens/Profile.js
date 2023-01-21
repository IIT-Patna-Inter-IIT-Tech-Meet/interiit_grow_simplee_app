/* eslint-disable */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [UserId, setUserId] = useState('12345');

  const handleLogout = () => {
    navigation.navigate('Login');
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
            <Text className="text-white text-l ">User Id: {UserId}</Text>
            {/* <TouchableOpacity className="flex-1 align-middle"> */}
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
