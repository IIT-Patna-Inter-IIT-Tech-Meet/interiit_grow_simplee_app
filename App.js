/* eslint-disable */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {WithSplashScreen} from './components/Splash';
import { RootNavigator } from './navigation/rootNavigator';
import { Login } from './screens/Login';
import ProfilePage from './screens/Profile';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);
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
