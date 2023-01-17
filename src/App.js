import {NavigationContainer} from '@react-navigation/native';
import {BottomTabBarHeightCallbackContext, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemToDeliver from './screens/ItemToDeliver';
import ItemsDelivered from './screens/ItemsDelivered';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#00ff57',
          tabBarStyle: {backgroundColor: '#262a35'},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="rocket" size={30} color="#900" />;
          },
        }}>
        <Tab.Screen name="In queue" component={ItemToDeliver} />
        <Tab.Screen name="Delivered" component={ItemsDelivered} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}