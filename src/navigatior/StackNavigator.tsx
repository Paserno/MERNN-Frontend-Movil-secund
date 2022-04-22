import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './Navigator';
import { LoadinScreen } from '../pages/LoadinScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';

const Stack = createStackNavigator();

export const StackNav = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
      <Stack.Screen name="LoadinScreen" component={LoadinScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      <Stack.Screen name="Navigator" component={Navigator} />
      
    </Stack.Navigator>
  );
}