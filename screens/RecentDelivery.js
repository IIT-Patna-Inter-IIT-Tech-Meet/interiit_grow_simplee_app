/* eslint-disable */
import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import bg from '../assets/images/bg.png';
import RecentItem from '../components/RecentItem';
import user from '../assets/images/user.png';
import arrow from '../assets/images/arrw.png';

// *********************************************************
// IMPORTANT: Change this to your local IP address
const host = '192.168.137.207:5000';
// *********************************************************


const RecentDelivery = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('John Doe');
  const [address, setAddress] = useState('Patna deliveries location');
  const [time, setTime] = useState('10:20 AM');
  const [awb, setAwb] = useState('A123456789');
  const [recentdata, setRecentdata] = useState([]);

  useEffect(() => {
    const handleLogin = async () => {
      let body = { "start": "2023-02-05T11:23:32.497Z" };
      // console.log(body);
      try {
        const response = await fetch(`http://${host}/rider/past-deliveries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        // Flushing the old cookies to prevent any issues
        
  
        const data = await response.json();
        console.log(data);
        // dummydata = [
        //   {
        //     id:"4521",
        //     AWB:"A123456789",
        //     deliveryTimestamp:"12:00 PM",
        //     customer:{
        //       address:"Patna deliveries location",
        //       name:"John Doe"
        //     }
        //   }
        // ]
        setRecentdata(data);
  
        if (response.status === 200) {
          
        }
        else if (response.status === 401) {
          console.log("Unauthorized Access");
          console.log(data);
        }
        else if (response.status === 401) {
          console.log("Malformed Request");
          console.log(data);
        }
  
        else {
          console.log("Login failed");
          console.log(data);
        }
      }
      catch (err) {
        console.log(err);
      }
    };
    handleLogin();
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#152431', '#121417']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Recent Orders</Text>
        </View>
        <FlatList
          data={recentdata}
          renderItem={({ item }) => <RecentItem item={item} />}
          // data={recentdata}
          // renderItem={({ recentdata }) => <OrderItem item={recentdata} />}
          keyExtractor={item => item.id}
          style={{ height: 650 }}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

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
  headerText: {
    color: '#fff',
    fontSize: 30,
  }
});

export default RecentDelivery