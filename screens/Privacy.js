/*eslint-disable*/
import { React, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const Privacy = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <LinearGradient
        colors={['#152431', '#292929']}
        className="h-full">
        <ScrollView className="flex flex-col align-middle">
          <Text className="text-white text-xl">This page is for the app's Privacy Policy</Text>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Privacy