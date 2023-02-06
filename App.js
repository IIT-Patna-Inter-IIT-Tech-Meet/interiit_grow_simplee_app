/* eslint-disable */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {WithSplashScreen} from './components/Splash';
import { RootNavigator } from './navigation/rootNavigator';
import { Login } from './screens/Login';
import ProfilePage from './screens/Profile';
import { io } from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import CookieManager from '@react-native-cookies/cookies';
import { HOST } from './screens/host';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({"latitude": 0, "longitude": 0});
  const [cookie, setCookie] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setIsAppReady(true);

    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 3600000},
    );

    // get cookie from async storage if saved previously
    async function cookie_set(){
      setCookie(JSON.parse(await AsyncStorage.getItem('rider_cookie')))
    }
    cookie_set();

  }, []);

  useEffect(() => {
    console.log({cookie});
    if (cookie != {} && cookie != null && cookie.jwt != null) {
      setSocket(
        io(`http://${HOST}`, {
          withCredentials: false,
          extraHeaders: {
            Cookie: `${cookie.jwt.name}=${cookie.jwt.value}`,
          },
        }),
      );
    }

    setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => console.log(error),
        {enableHighAccuracy: false, timeout: 30000, maximumAge: 3600000},
      );
    }, 5000);

  }, [cookie]);

  useEffect(()=>{
    if (currentLocation && socket) {
        
        if (JSON.stringify(cookie) != '{}') {
          console.log(`${cookie.jwt.name}=${cookie.jwt.value}`);
          
          socket.emit(
            'rider:move',
            currentLocation.latitude,
            currentLocation.longitude,
          );

          console.log('emitted');
        } else {
          console.log('not emitted')
        }

    }
  }, [currentLocation])

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        {/* <Login/> */}
      </PaperProvider>
    </WithSplashScreen>
  );
}
