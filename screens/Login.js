/* eslint-disable */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Login = () => {
  const [userName, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <ScrollView className="flex flex-col">
        <View className="flex flex-row items-center justify-center pt-24">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-16 h-16"
          />
          <View className="flex flex-col">
            <Text className="text-4xl font-bold text-white">Grow Simplee</Text>
            <Text className="text-4xl font-bold text-white">Rider's App</Text>
          </View>
        </View>
        <Text className="text-3xl font-medium text-white mt-16 text-left pl-5">
          Login
        </Text>
        <Text className="text-sm text-gray-400 mt-1 text-left pl-5">
          Please sign in to your account
        </Text>

        <Text className="mt-16 text-left ml-5 mb-1">Username</Text>
        <View className="flex items-center">
          <TextInput
            className="bg-[#252a34] w-11/12 h-14 border border-transparent rounded-lg"
            placeholder="Enter Your Username"
            placeholderTextColor="#9ca3af"
            selectionColor="#9ca3af"
            onChangeText={setUsername}
            underlineColor="transparent"
            theme={{colors: {text: 'black', primary: '#252a34'}}}
          />
        </View>

        <Text className="mt-5 text-left ml-5 mb-1">Password</Text>
        <View className="flex items-center">
          <TextInput
            className="bg-[#252a34] w-11/12 h-14 border border-transparent rounded-lg"
            placeholder="Enter Your Password"
            placeholderTextColor="#9ca3af"
            selectionColor="#9ca3af"
            secureTextEntry={isPasswordSecure}
            onChangeText={setPassword}
            underlineColor="transparent"
            theme={{colors: {text: 'black', primary: '#252a34'}}}
            right={
              <TextInput.Icon
                icon={() => 
                  <Icon
                    name={isPasswordSecure ? 'eye-off' : 'eye'}
                    size={24}
                    color="#9ca3af"
                  />
                }
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
          <Button className="border rounded-xl w-11/12 h-12 bg-[#00ff57] mt-16">
            <Text className="text-gray-900 text-lg">Login</Text>
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};