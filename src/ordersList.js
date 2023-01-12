import React from 'react';
import {Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-200`}>
      <Text style={tw`text-2xl text-black text-center`}>
        Welcome to the Grow Simplee Rider's App
      </Text>
    </View>
  );
}
