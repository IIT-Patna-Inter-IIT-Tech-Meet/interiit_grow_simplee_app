/* eslint-disable */
import {createStackNavigator} from '@react-navigation/stack';
import { Profile } from '../screens/Profile';
import { EditProfile } from '../screens/EditProfile';
import { Login } from '../screens/Login';
import CustomerSupport from '../screens/CustomerSupport';
import Privacy from '../screens/Privacy';
import RecentDelivery from '../screens/RecentDelivery';
import { CardStyleInterpolators } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RighttoLeftAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Profile" component={Profile} options={{ cardStyleInterpolator: forFade }} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        {/* <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} /> */}
        <ProfileStack.Screen name="EditProfile" component={EditProfile} options={RighttoLeftAnimation} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="CustomerSupport" component={CustomerSupport} options={ RighttoLeftAnimation} />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Privacy" component={Privacy} options={ RighttoLeftAnimation } />
      </ProfileStack.Group>
      <ProfileStack.Group screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="RecentDelivery" component={RecentDelivery} options={ RighttoLeftAnimation } />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};
