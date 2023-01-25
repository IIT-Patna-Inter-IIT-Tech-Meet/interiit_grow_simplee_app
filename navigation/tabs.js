/* eslint-disable */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

//screens
import { Home } from '../screens/Home';
import { Maps } from '../screens/Map';
import { Rides } from '../screens/Rides';

//icons
import HomeIcon from "react-native-vector-icons/Feather";
import Notes from "react-native-vector-icons/Foundation";
import Location from "react-native-vector-icons/SimpleLineIcons";
import Rider from "react-native-vector-icons/AntDesign";

//navigation
import { ProfileNavigator } from './profileNavigator';

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const deliveries = [
  {
  latitude: 37.78825,
  longitude: -122.4324,
},
{
  latitude: 37.819888,
  longitude: -122.485841,
},
{
  latitude: 37.766311,
  longitude: -122.434468,
}
];

const pickups = [
  {
  latitude: 37.790074,
  longitude: -122.419541,
},
{
  latitude: 37.779608,
  longitude: -122.401567,
},
{
  latitude: 37.770735,
  longitude: -122.465636,
}
];

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel:false, tabBarStyle:{
      position:'absolute',
      bottom:25,
      left:20,
      right:20,
      elevation:0,
      backgroundColor:'black',
      borderRadius:15,
      height:80,
      borderTopColor: '#000',
      ...style.shadow
    }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused,size}) => (
          <HomeIcon name='home' size={size} color={focused?'#04F968':'#9ca3af'}/>
        ),cardStyleInterpolator: forFade
      }} />
      <Tab.Screen name="Rides" component={Rides} options={{
        tabBarIcon:({focused,size}) => (
          <Notes name='clipboard-notes' size={size} color={focused?'#04F968':'#9ca3af'}/>
        ),cardStyleInterpolator: forFade
      }}  />
      <Tab.Screen name="Map" component={Maps} initialParams={{deliveries , pickups}} options={{
        tabBarIcon:({focused,size}) => (
          <Location name='location-pin' size={size} color={focused?'#04F968':'#9ca3af'}/>
        ),cardStyleInterpolator: forFade
      }} />
      <Tab.Screen name="Account" component={ProfileNavigator} options={{
        tabBarIcon:({focused,size}) => (
          <Rider name='user' size={size} color={focused?'#04F968':'#9ca3af'}/>
        ),cardStyleInterpolator: forFade
      }} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow:{
    shadowColor:"rgba(0,0,0,0.7)",
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
})
export default Tabs;
