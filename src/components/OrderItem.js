import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

const OrderItem = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.item}</Text>
    <Text style={styles.location}>Address: {item.location}</Text>
    <Text style={styles.price}>Amount: {item.price} INR</Text>
    <Text style={styles.time}>Deliver By: {item.DeliverBy}</Text>
    <Pressable
      style={styles.btn}
      android_ripple={{color: 'black'}}
      onPress={() => console.log('Pressed')}>
      <Text style={{color: '#000000'}}>Verify Delivery</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#262a35',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    color: '#fcfcfc',
  },
  location: {
    fontSize: 16,
    marginTop: 5,
    color: '#a1a4b2',
  },
  price: {
    fontSize: 16,
    color: '#a1a4b2',
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    color: '#a1a4b2',
    marginBottom: 5,
  },
  btn: {
    backgroundColor: '#00ff57',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default OrderItem;
