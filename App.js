/* eslint-disable */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Login } from './screens/Login';
import ProfilePage from './screens/Profile';

export default function App() {
  return (
    <PaperProvider>
      {/* <Login/> */}
      <ProfilePage/>
    </PaperProvider>
  );
}