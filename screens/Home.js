/* eslint-disable */
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import bg from '../assets/images/bg.png';
import OrderItem from '../components/OrderItem';
import user from '../assets/images/user.png';
import arrow from '../assets/images/arrw.png';

const items = [
  {
    id: '1',
    item: 'Milk',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '100',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
  {
    id: '2',
    item: 'Bread',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '50',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
  {
    id: '3',
    item: 'Eggs',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '200',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
  {
    id: '4',
    item: 'Eggs',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '200',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
  {
    id: '5',
    item: 'Eggs',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '200',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
  {
    id: '6',
    item: 'Eggs',
    location: 'B-1, 2nd Floor, Sector 63, Noida, Uttar Pradesh 201301',
    warehouse: 'Patna Goods inventory',
    price: '200',
    DeliverBy: '12:00 PM',
    distance: '110 Km',
  },
];

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#152431', '#121417']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <View>
            <Image source={user} style={{marginRight: 10}} />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{color: '#ffffff', fontSize: 16}}>Welcome, John</Text>
            <Pressable onPress={()=>{console.log("Pressed!")}}>
              <Text style={{color: '#ffffff', fontSize: 12}}>
                Overall trip performance <Image source={arrow} />
              </Text>
            </Pressable>
          </View>
        </View>

        <FlatList
          data={items}
          renderItem={({item}) => <OrderItem item={item} />}
          keyExtractor={item => item.id}
          style={{height: 650}}
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
    height: 150,
    marginTop: 30,
  },
});
