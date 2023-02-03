/* eslint-disable */
import {createStackNavigator} from '@react-navigation/stack';
import { ForgotPass } from '../screens/ForgotPassword';
import { Login } from '../screens/Login';
import Splash2 from '../screens/Splash2';
import TabNavigator from './tabs';

const LoginStack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Group screenOptions={{headerShown:false}}>
        <LoginStack.Screen name="Splash2" component={Splash2} options={{ cardStyleInterpolator: forFade }}/>
      </LoginStack.Group>
      <LoginStack.Group screenOptions={{headerShown:false}}>
        <LoginStack.Screen name="Login" component={Login} options={{ cardStyleInterpolator: forFade }} />
      </LoginStack.Group>
      <LoginStack.Group screenOptions={{headerShown:false}}>
        <LoginStack.Screen name="MainScreen" component={TabNavigator} options={{ cardStyleInterpolator: forFade }} />
      </LoginStack.Group>
      <LoginStack.Group screenOptions={{headerShown:false}}>
        <LoginStack.Screen name="ForgotPass" component={ForgotPass} options={{ cardStyleInterpolator: forFade }} />
      </LoginStack.Group>
    </LoginStack.Navigator>
  );
};
