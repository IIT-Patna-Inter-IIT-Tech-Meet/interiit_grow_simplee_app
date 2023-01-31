/* eslint-disable */
import {createStackNavigator} from '@react-navigation/stack';
import { Rides } from '../screens/Rides';
import {DeliveryAccuracy} from '../screens/DeliveryAccuracy';
import {TotalRides} from '../screens/TotalRides';
import { CardStyleInterpolators } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});


export const RidesNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Rides" component={Rides} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="TotalRides" component={TotalRides} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="DeliveryAccuracy" component={DeliveryAccuracy} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />
        {/* <ProfileStack.Screen name="EditProfile" component={EditProfile} options={RighttoLeftAnimation} /> */}
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};
