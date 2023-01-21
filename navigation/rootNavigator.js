/* eslint-disable */
import TabNavigator from './tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { LoginNavigator } from './loginNavigator';

const RootStack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
export const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{headerShown:false}}>
        <RootStack.Screen name="LoginNavigator" component={LoginNavigator} options={{ cardStyleInterpolator: forFade }}/>
      </RootStack.Group>
      <RootStack.Group screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Main" component={TabNavigator} options={{ cardStyleInterpolator: forFade }} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
