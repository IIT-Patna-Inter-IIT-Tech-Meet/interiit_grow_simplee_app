import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import OrderItem from '../components/OrderItem';

const DATA = [
  {
    item: 'Item 01',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 100,
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    DeliverBy: '12:00 PM',
  },
  {
    item: 'Item 2',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 200,
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    DeliverBy: '01:00 PM',
  },
  {
    item: 'Item 3',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 300,
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    DeliverBy: '02:00 PM',
  },
  {
    item: 'Item 4',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 100,
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    DeliverBy: '03:00 PM',
  },
  {
    item: 'Item 5',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 200,
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    DeliverBy: '04:00 PM',
  },
  {
    item: 'Item 6',
    location: '3/A, Khalisha Kota Palli, Kolkata, West Bengal 700101',
    price: 300,
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    DeliverBy: '05:00 PM',
  },
];

const ItemsDelivered = () => {
  const renderItem = ({item}) => <OrderItem item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items to Deliver</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181820',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    color: '#fcfcfc',
    margin: 10,
  },
});

export default ItemsDelivered;
