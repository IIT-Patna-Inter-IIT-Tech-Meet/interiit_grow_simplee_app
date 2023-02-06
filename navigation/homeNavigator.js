/* eslint-disable */
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {VerifyDelivery} from '../screens/VerifyDelivery';
import {CardStyleInterpolators} from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{headerShown: false}}>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        </HomeStack.Group>
         <HomeStack.Group screenOptions={{headerShown: false}}>
        <HomeStack.Screen
          name="VerifyDelivery"
          component={VerifyDelivery}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};
