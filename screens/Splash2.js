/* eslint-disable */
import React, {useContext} from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';
import {HOST} from '../host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../Context/LoginContext';

const Splash2 = () => {
  const navigation = useNavigation();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLoginNavigation =  () => {
  
      CookieManager.get(`http://${HOST}/rider/login`).then(async  cookies => {
        if (cookies != {}) {
          await AsyncStorage.setItem('rider_cookie', JSON.stringify(cookies));
        }

        if (JSON.stringify(cookies) != '{}') {
          setLoggedIn(true);
          navigation.navigate('MainScreen');
        } else {
          setLoggedIn(false);
          navigation.navigate('Login');
        }
      });
  }

  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <ImageBackground source={require('../assets/images/Splash2.png')}>
        <View className="h-full">
          <View className="mt-[120%] flex-1 ml-10">
            <Text className="text-2xl font-semibold text-white mb-7">
              Deliver <Text className="text-[#1976D2]">Same Day</Text>
            </Text>
            <Text className="text-2xl text-white font-semibold">
              Delight your Customers
            </Text>
            <Text className="text-2xl text-white font-semibold">
              Increase Your Sales
            </Text>
            <TouchableOpacity
              onPress={handleLoginNavigation}
              className="border-2 py-3 rounded-xl align-middle items-center mt-24 w-11/12 bg-[#181920] border-[#04F968]">
              <Text className="text-[#04F968] text-lg">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash2;
