import {Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ItemToDeliver from './screens/ItemToDeliver';
import ItemsDelivered from './screens/ItemsDelivered';
import home from './assets/img/home-active.png';
import homeAlt from './assets/img/home-alt.png';
import pinAlt from './assets/img/pin.png';
import pin from './assets/img/pin-active.png';
import checklist from './assets/img/Vector-active.png';
import checklistAlt from './assets/img/Vector.png';
import profileAlt from './assets/img/profile.png';
import profile from './assets/img/profile-active.png';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00ff57',
          tabBarStyle: {
            backgroundColor: '#000000',
            borderRadius: 20,
            overflow: 'hidden',
            left: 0,
            bottom: 15,
            right: 0,
            position: 'absolute',
            paddingTop: 30,
            paddingBottom: 30,
            borderTopWidth: 0,
            marginRight: 20,
            marginLeft: 20,
          },
        })}>
        <Tab.Screen
          name="In queue"
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return focused ? (
                <Image style={{width: 18, height: 22}} source={home} />
              ) : (
                <Image style={{width: 18, height: 22}} source={homeAlt} />
              );
            },
          }}
          component={ItemToDeliver}
        />
        <Tab.Screen
          name="map"
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return focused ? (
                <Image style={{width: 18, height: 22}} source={pin} />
              ) : (
                <Image style={{width: 18, height: 22}} source={pinAlt} />
              );
            },
          }}
          component={ItemsDelivered}
        />
        <Tab.Screen
          name="list"
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return focused ? (
                <Image style={{width: 18, height: 22}} source={checklist} />
              ) : (
                <Image style={{width: 18, height: 22}} source={checklistAlt} />
              );
            },
          }}
          component={ItemToDeliver}
        />
        <Tab.Screen
          name="profile"
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return focused ? (
                <Image style={{width: 22, height: 22}} source={profile} />
              ) : (
                <Image style={{width: 22, height: 22}} source={profileAlt} />
              );
            },
          }}
          component={ItemsDelivered}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
