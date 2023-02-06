/* eslint-disable */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
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
import {HOST} from './host';

// *********************************************************
// IMPORTANT: Change this to your local IP address
// const host = '192.168.137.207:5000';
// *********************************************************

export const ForgotPass = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [emailsent, setEmailsent] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isOtpSecure, setIsOTPSecure] = useState(true);
  const handleSendOTP = async () => {
    let body = { "email": email };
    // console.log(body);
    try {
      const response = await fetch(`http://${HOST}/rider/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
     

      const data = await response.json();

      if (response.status === 200) {
        setEmailsent(true);
        console.log(data);
        // CookieManager.get(`http://${HOST}/rider/login`)
        //   .then((cookies) => {
        //     console.log('CookieManager.get =>', cookies);
        //   });
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

  const handleSubmitOTP = async() => {
    let body = { "email": email, "otp": otp, "password":password };
        try {
            const response = await fetch(`http://${HOST}/rider/reset-password`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
      
            const data2 = await response.json();
            console.log(data2);
            if (response.status === 200) {
                navigation.navigate('Login');
            }
            else if (response.status === 403) {
                console.log("OTP Expired or Invalid");
            }

        }
        catch (err) {
            console.log(err);
            }
  }
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
        {emailsent ? (
            <View>
        <View className="flex items-center">
          <TextInput
            className="bg-[#181920] w-11/12 border border-transparent rounded-lg mt-5 h-16"
            label="OTP"
            mode="outlined"
            placeholderTextColor="#9ca3af"
            selectionColor="#fff"
            secureTextEntry={isOtpSecure}
            onChangeText={setOtp}
            textColor="white"
            activeOutlineColor="#04F968"
            outlineColor="#252a34"
            underlineColor="transparent"
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={isOtpSecure ? 'eye-off' : 'eye'}
                    size={24}
                    color="#9ca3af"
                  />
                )}
                onPress={() => {
                    isOtpSecure
                    ? setIsOTPSecure(false)
                    : setIsOTPSecure(true);
                }}
              />
            }
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
          <View className="flex items-center">
          <Button
            className="border rounded-xl w-11/12 h-12 bg-[#04F968] mt-5"
            onPress={handleSubmitOTP}>
            <Text className="text-gray-900 text-lg">Change Password</Text>
          </Button>
        </View>
        </View>
        ) : null}
        {!emailsent ? (<View className="flex items-center">
          <Button
            className="border rounded-xl w-11/12 h-12 bg-[#04F968] mt-5"
            onPress={handleSendOTP}>
            <Text className="text-gray-900 text-lg">Send OTP</Text>
          </Button>
        </View>): null} 
      </ScrollView>
    </SafeAreaView>
  );
};
