import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import { Navigator } from './Navigator';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';
import { LoadingScreen } from '../pages/LoadingScreen';
import { JardinerosScreen } from '../pages/JardinerosScreen';

const Stack = createStackNavigator();

export const StackNav = () => {

  const { status } = useContext( AuthContext );

  if ( status === 'checking') return <LoadingScreen />

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >

        {
          ( status !== 'authenticated' ) 
              ? (
                <>
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
              )
              : (
                <>
                  <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
                  <Stack.Screen name="Navigator" component={Navigator} />
                  <Stack.Screen name="JardinerosScreen" options={{ title: 'Jardineros'}} component={JardinerosScreen} />
                </>
              )

        }

      
    </Stack.Navigator>
  );
}