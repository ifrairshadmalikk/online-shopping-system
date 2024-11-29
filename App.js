import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './screens/LoginScreen'; // Login Screen
import RegisterScreen from './screens/RegisterScreen'; // Register Screen
import HomeScreen from './screens/Home';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmedScreen from './screens/OrderConfirmedScreen';
import ProductDetail from './screens/ProductDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [cart, setCart] = useState([]);
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          } else if (route.name === 'Checkout') {
            iconName = 'cash';
          } else if (route.name === 'OrderConfirmed') {
            iconName = 'checkmark-done';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen cart={cart} setCart={setCart} />}
      />
      <Tab.Screen
        name="Cart"
        children={() => <CartScreen cart={cart} setCart={setCart} />}
      />
      <Tab.Screen
        name="Checkout"
        component={CheckoutScreen}
      />
      <Tab.Screen
        name="OrderConfirmed"
        component={OrderConfirmedScreen}
      />
    </Tab.Navigator>
  );

  // Main App Stack Navigator
  return (
    <NavigationContainer>
      
      
      <Stack.Navigator initialRouteName="WelcomeScreen">
     
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'Product Details' }}
        />
      
        
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
