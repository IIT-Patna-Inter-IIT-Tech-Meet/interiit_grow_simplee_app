/* eslint-disable */
import React from 'react';
import { View, Text, Image } from 'react-native';
import circle from '../assets/images/Ellipse.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';

const RecentItem = ({item}) => {
  const timeStamp = item.delivery
    ? item.deliveryTimestamp
    : item.pickupTimestamp;
  const deliverBy = timeStamp.slice(0, -1).concat('+05:30');
  const time = new Date(deliverBy).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <View className="bg-[#CCCDCD4D] p-5 border rounded-2xl mt-2 mb-2 ml-4 mr-4">
      <View className="flex-1 flex-row items-center mb-2">
        <View style={{flex: 3}}>
          <View className="flex-1 flex-row items-center">
            <Image className="w-2.5 h-2.5" source={circle} />
            <Text className="text-white text-xs ml-1">
              {item.customer.name}
            </Text>
          </View>

          <Image source={line} className="ml-1 w-[2px] h-4" />

          <View className="flex-1 flex-row">
            <Image className="mt-1 w-3 h-3" source={square} />
            <Text className="text-white text-xs ml-1">
              {item.customer.address}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1 flex-row bg-black border rounded-lg m-3 p-3">
        <View className="flex-1 items-center">
          <Text className="text-xs text-white">
            {item.delivery ? 'Delivered On' : 'Picked Up On'}
          </Text>
          <Text className="font-bold text-2xl text-white">{time}</Text>
        </View>
        <Text className="text-white">|</Text>
        <View className="flex-1 items-center">
          <Text className="text-xs text-white">AWB No.</Text>
          <Text className="font-bold text-2xl text-white">{item.AWB}</Text>
        </View>
      </View>
    </View>
  );
};

export default RecentItem;