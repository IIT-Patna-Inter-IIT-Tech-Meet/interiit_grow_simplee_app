import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import circle from '../assets/images/Ellipse.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';

const RecentItem = ({item,navigation}) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View style={{flex: 3}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 10, height: 10}} source={circle} />
            <Text style={styles.location}>{item.customer.name}</Text>
          </View>

          <Image source={line} width={2} height={18} style={{marginLeft: 4}} />

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              style={{width: 10, height: 10, marginTop: 3}}
              source={square}
            />
            <Text style={styles.location}>{item.customer.address}</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.id}</Text>
      </View>

      <View style={styles.info}>
        {/* <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#ffffff', fontSize: 10}}>Total Distance</Text>
          <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>
            {item.distance}
          </Text>
        </View> */}
        {/* <Text style={{color: '#ffffff'}}>|</Text> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#ffffff', fontSize: 10}}>Delivered On</Text>
          <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>
            {item.deliveryTimestamp}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#ffffff', fontSize: 10}}>AWB No.</Text>
          <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>
            {item.AWB}
          </Text>
        </View>
      </View>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('VerifyDelivery')}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#3EEF85', fontSize: 13}}>Verify Delivery </Text>
          <Text style={{color: '#3EEF85', fontSize: 20}}>{'>'}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#CCCDCD4D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    color: '#fcfcfc',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 2,
  },
  location: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: '#a1a4b2',
    marginTop: 5,
    marginBottom: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    padding: 10,
    marginHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default RecentItem;
