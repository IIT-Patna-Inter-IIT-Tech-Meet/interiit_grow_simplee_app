/* eslint-disable */
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import bg from '../assets/images/bg.png';
import OrderItem from '../components/OrderItem';
import user from '../assets/images/user.png';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const host = '192.168.137.207:5000';
export const Home = () => {
  const isFocused = useIsFocused();
  const [rider_name, setRiderName] = useState('Rider');
  const [deliveryPackages, setDeliveryPackages] = useState([
    {
      "id":"85",
      "AWB":"123!@#",
      "EDD":"2021-05-22T13:10:00.000Z",
      "deliveryTimestamp":"",
      "customer":{
        "address":"Noida, UP",
        "name":"Aditya Kumar",
        "latitude":25.4723,
        "longitude":85.7082,
      },
      "delivery":true
    },
    {
      "id":"13",
      "AWB":"123r@#",
      "EDD":"2021-05-23T13:50:00.000Z",
      "deliveryTimestamp":"",
      "customer":{
        "address":"Barh, Bihar",
        "name":"Anurag Deo",
        "latitude":25.4823,
        "longitude":85.8082,
      },
      "delivery":true
    }
  ]);
  useEffect(() => {
    const getRiderName = async () => {
      const rider_info = await AsyncStorage.getItem('rider_data');
      const rider_data = JSON.parse(rider_info);
      setRiderName(rider_data.name);
    }
    const fetchDeliveryDetails = async () => {
      const response = await fetch(`http://${host}/package/route-packages`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    }
    if(isFocused){
      getRiderName();
      fetchDeliveryDetails();
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#152431', '#121417']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <View>
            <Image source={user} style={{ marginRight: 10 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ffffff', fontSize: 16 }}>Welcome, {rider_name}</Text>
          </View>
        </View>

        <FlatList
          data={deliveryPackages}
          renderItem={({ item }) => <OrderItem item={item} />}
          keyExtractor={item => item.id}
          style={{ height: 650 }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181920',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  scrollSection: {
    flex: 1,
    backgroundImage: `url(${bg})`,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    height: 110,
    marginTop: 30,
  },
});
