/* eslint-disable */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Login } from './screens/Login';

export default function App() {
  return (
    <PaperProvider>
      <Login/>
    </PaperProvider>
  );
}