/* eslint-disable */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {WithSplashScreen} from './components/Splash';
import {RootNavigator} from './navigation/rootNavigator';
import {io} from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import {HOST} from './host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginContext} from './Context/LoginContext';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [cookie, setCookie] = useState({});
  const [socket, setSocket] = useState(null);
  const [wait, setWait] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [locations, setLocations] = useState([]);

  setTimeout(() => {
    setWait(true);
  }, 10000);

  async function cookie_set() {
    let tempCookie = await AsyncStorage.getItem('rider_cookie');
    if (tempCookie != JSON.stringify(cookie)) {
      console.log(JSON.parse(tempCookie));
      console.log({cookie});
      setCookie(JSON.parse(tempCookie));
    }
  }
  useEffect(() => {
    cookie_set();
    if (cookie != {} && cookie != null && cookie.jwt != null) {
      setSocket(
        io(`http://${HOST}`, {
          withCredentials: false,
          extraHeaders: {
            Cookie: `${cookie.jwt.name}=${cookie.jwt.value}`,
          },
        }),
      );
      console.log('socket created');
    }
    console.log(loggedIn);
  }, [cookie, loggedIn]);

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

  }, [wait]);
  useEffect(() => {

    const interval = setInterval(() => {
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
    return () => clearInterval(interval);
  }, [cookie]);

  useEffect(() => {
    if (currentLocation && socket) {
      if (cookie != {} && cookie != null && cookie.jwt != null) {
        // console.log(`${cookie.jwt.name}=${cookie.jwt.value}`);
        console.log('emitting');

        socket.emit(
          'rider:move',
          currentLocation.latitude,
          currentLocation.longitude,
        );

        socket.on('pickup:get', data => {
          setLocations(data);
        });

        // console.log('emitted');
      } else {
        console.log('not emitted');
      }
    }
  }, [currentLocation, loggedIn]);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <PaperProvider>
        <LoginContext.Provider
          value={{loggedIn, setLoggedIn, locations, setLocations}}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </LoginContext.Provider>
        {/* <Login/> */}
      </PaperProvider>
    </WithSplashScreen>
  );
}
