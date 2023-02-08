/* eslint-disable */
import React, {useState, useEffect} from 'react';
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
import {HOST} from '../host';


const RecentDelivery = () => {
  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    const fetchRecentDelivery = async () => {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      let body = {start: startDate};
      try {
        const response = await fetch(`http://${HOST}/rider/past-deliveries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        // Flushing the old cookies to prevent any issues

        const data = await response.json();

        if (response.status === 200) {
          console.log(data);
          setRecentData(data.packages);
        } else {
          console.log(data);
          throw new Error('Something went wrong!');
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRecentDelivery();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#152431', '#121417']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Recent Orders</Text>
        </View>
        <FlatList
          data={recentData}
          renderItem={({item}) => <RecentItem item={item} />}
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
  headerText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default RecentDelivery;
