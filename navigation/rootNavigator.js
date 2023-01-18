/* eslint-disable */
import TabNavigator from './tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Login } from '../screens/Login';

const RootStack = createStackNavigator();
export const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Login" component={Login}/>
      </RootStack.Group>
      <RootStack.Group screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
