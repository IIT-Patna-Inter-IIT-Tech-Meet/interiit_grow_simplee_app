/* eslint-disable */
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import bg from '../assets/images/bg.png';
import OrderItem from '../components/OrderItem';
import user from '../assets/images/user.png';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST} from './host';

// const host = '192.168.137.207:5000';
export const Home = () => {
  const isFocused = useIsFocused();
  const [rider_name, setRiderName] = useState('Rider');
  const [deliveryPackages, setDeliveryPackages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeliveryDetails = async () => {
    try {
      const response = await fetch(`http://${HOST}/package/route-packages`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setDeliveryPackages(data.packages);
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false)
  };

  useEffect(() => {
    const getRiderName = async () => {
      const rider_info = await AsyncStorage.getItem('rider_data');
      const rider_data = JSON.parse(rider_info);
      setRiderName(rider_data.name);
    };
    if (isFocused) {
      getRiderName();
      fetchDeliveryDetails();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#152431', '#121417']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <View>
            <Image source={user} style={{marginRight: 10}} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: '#ffffff', fontSize: 16}}>
              Welcome, {rider_name}
            </Text>
          </View>
        </View>

        {deliveryPackages.length == 0 ? (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: '#ffffff', fontSize: 16}}>
              No packages to deliver
            </Text>
          </View>
        ) : (
          <FlatList
            onRefresh={() => {
              setRefreshing(true);
              fetchDeliveryDetails();
            }}
            refreshing={refreshing}
            data={deliveryPackages}
            renderItem={({item}) => <OrderItem item={item} />}
            keyExtractor={item => item.id}
            style={{height: 650}}
          />
        )}
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
    alignItems: 'center'
  },
});
