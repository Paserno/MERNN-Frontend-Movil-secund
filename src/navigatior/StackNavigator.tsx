import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import { Navigator } from './Navigator';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';
import { LoadingScreen } from '../pages/LoadingScreen';
import { JardinerosScreen } from '../pages/JardinerosScreen';
import { ChatScreen } from '../pages/ChatScreen';
import { EditarScreen } from '../pages/EditarScreen';
import { TopTabNavigator } from './TopTab';

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
                  <Stack.Screen name="ChatScreen" component={ChatScreen} />
                  <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
                  <Stack.Screen name="EditarScreen" component={EditarScreen} />
                </>
              )

        }

      
    </Stack.Navigator>
  );
}
