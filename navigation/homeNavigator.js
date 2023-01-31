/* eslint-disable */
import {createStackNavigator} from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { VerifyDelivery } from '../screens/VerifyDelivery';
import { CardStyleInterpolators } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});


export const HomeNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Home" component={Home} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="VerifyDelivery" component={VerifyDelivery} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
        {/* <ProfileStack.Screen name="EditProfile" component={EditProfile} options={RighttoLeftAnimation} /> */}
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};
