/* eslint-disable */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import {AsyncStorage} from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// *********************************************************
// IMPORTANT: Change this to your local IP address
const host = '172.16.183.142:5000';
// *********************************************************

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const handleLogin = async () => {
    let body = { "email": email, "password": password };
    // console.log(body);
    try {
      const response = await fetch(`http://${host}/rider/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      // Flushing the old cookies to prevent any issues
      await CookieManager.clearAll()
        .then((success) => {
          // console.log('CookieManager.clearAll =>', success);
        });

      const data = await response.json();

      if (response.status === 200) {
        await CookieManager.setFromResponse(`http://${host}/rider/login`, response.headers.get('set-cookie'))
          .then((res) => {
            // `res` will be true or false depending on success.
            // console.log('CookieManager.setFromResponse =>', res);
          });
        console.log(data);
        await AsyncStorage.setItem("rider_data",JSON.stringify(data.rider));
        // await AsyncStorage.setItem("rider_email",data.rider.email);
        // await AsyncStorage.setItem("rider_phone",data.rider.phoneno);
        // await AsyncStorage.setItem("rider_id",data.rider._id);
        // await AsyncStorage.setItem("rider_bloodGroup",data.rider.bloodGroup);




        // const value = await AsyncStorage.getItem('rider_data');
        // console.log(value);
        // CookieManager.get(`http://${host}/rider/login`)
        //   .then((cookies) => {
        //     console.log('CookieManager.get =>', cookies);
        //   });
        navigation.navigate('Main');
      }
      else if (response.status === 401) {
        console.log("Unauthorized Access");
        console.log(data);
      }
      else if (response.status === 401) {
        console.log("Malformed Request");
        console.log(data);
      }

      else {
        console.log("Login failed");
        console.log(data);
      }
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <ScrollView className="flex flex-col">
        <View className="flex flex-row pt-20 pl-5 items-center">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-10 h-10"
          />
          <Text className="text-4xl font-bold text-white">Login</Text>
        </View>

        <View className="flex items-center">
          <TextInput
            className="bg-[#181920] w-11/12 border border-transparent rounded-lg mt-5 h-16"
            label="Email"
            mode="outlined"
            placeholderTextColor="#9ca3af"
            selectionColor="#fff"
            onChangeText={setEmail}
            underlineColor="transparent"
            textColor="white"
            activeOutlineColor="#04F968"
            outlineColor="#252a34"
          />
        </View>
        <View className="flex items-center">
          <TextInput
            className="bg-[#181920] w-11/12 border border-transparent rounded-lg mt-5 h-16"
            label="Password"
            mode="outlined"
            placeholderTextColor="#9ca3af"
            selectionColor="#fff"
            secureTextEntry={isPasswordSecure}
            onChangeText={setPassword}
            textColor="white"
            activeOutlineColor="#04F968"
            outlineColor="#252a34"
            underlineColor="transparent"
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={isPasswordSecure ? 'eye-off' : 'eye'}
                    size={24}
                    color="#9ca3af"
                  />
                )}
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
              />
            }
          />
        </View>
        <View className="flex flex-row pl-5 mt-14 w-3/5 justify-between">
          <Text className="text-base text-white">Forgot Password? </Text>
          {/* <TouchableOpacity > */}
          <TouchableOpacity onPress={()=>navigation.navigate('ForgotPass')}>
            <Text className="text-white font-bold text-base">
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center">
          <Button
            className="border rounded-xl w-11/12 h-12 bg-[#04F968] mt-5"
            onPress={handleLogin}>
            <Text className="text-gray-900 text-lg">Login</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
