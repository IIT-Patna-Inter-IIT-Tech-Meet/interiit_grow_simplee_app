/* eslint-disable */
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import bg from '../assets/images/bg.png';
import OrderItem from '../components/OrderItem';
import user from '../assets/images/user.png';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const items = [
  {
    latitude: 28.5355,
    longitude: 77.3910,
    amount: 500,
    location: 'Noida, UP',
    delivery: true,
    timestamp: "2021-07-20T12:59:00.000Z",
  },
  {
    latitude: 26.1542,
    longitude: 85.8918,
    amount: 800,
    location: 'Darbhanga, Bihar',
    delivery: true,
    timestamp: "2021-09-27T12:47:00.000Z",
  },
  {
    latitude: 26.7606,
    longitude: 83.3732,
    amount: 700,
    location: 'Gorakhpur, UP',
    delivery: true,
    timestamp: "2022-06-23T12:40:00.000Z",
  },
  {
    latitude: 25.4723,
    longitude: 85.7082,
    amount: 580,
    location: 'Barh, Bihar',
    delivery: true,
    timestamp: "2021-06-20T12:40:00.000Z",
  },
  {
    latitude: 19.0760,
    longitude: 72.8777,
    amount: 590,
    location: 'Mumbai, Maharastra',
    delivery: true,
    timestamp: "2021-05-20T12:00:00.000Z",
  },
  {
    latitude: 22.5726,
    longitude: 88.3639,
    amount: 500,
    location: 'Kolkata, West Bengal',
    delivery: true,
    timestamp: "2021-05-22T13:10:00.000Z",
  },
];

export const Home = () => {
  const isFocused = useIsFocused();
  const [rider_name, setRiderName] = React.useState('Rider');

  useEffect(() => {
    const getRiderName = async () => {
      const rider_info = await AsyncStorage.getItem('rider_data');
      const rider_data = JSON.parse(rider_info);
      setRiderName(rider_data.name);
    }
    if(isFocused){
      getRiderName();
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
          data={items}
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
