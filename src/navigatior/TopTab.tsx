import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { ChatScreen } from '../pages/ChatScreen';
import { Navigator } from './Navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundChat } from '../components/BackgroundChat';
import { SolicitudScreen } from '../pages/SolicitudScreen';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BackgroundChat>
    <Tab.Navigator
      style={{marginTop: top }}
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={ ({ route }) => ({
        tabBarPressColor: '#7574D0',
        tabBarShowIcon: true,
        tabBarIndicatorStyle:{
          backgroundColor: '#CDD0CC',
        },
        tabBarActiveTintColor: 'white',
        tabBarStyle:{ // En el caso que se quiera eliminar la sombra 
          shadowColor: 'transparent',
          elevation: 0,
          backgroundColor: '#5856D6',
        },
        tabBarIcon : ({color, focused})  => {

          let iconName: string = '';

          switch (route.name) {
            
            case 'ChatScreen':
              iconName = 'chatbox-ellipses'
              break;
            case 'SolicitudScreen':
              iconName = 'people'
              break;
            case 'Navigator':
              iconName = 'map-sharp'
              break;
          
            default:
              break;
          }
       return <Icon name={iconName} size={23} color={color} />
          // return <Text style={{color}}>{ iconName }</Text>
        },
      })}
    >
      <Tab.Screen name="SolicitudScreen" component={SolicitudScreen} options={{ title: 'Solicitud' }}/>
      <Tab.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }}/>
      <Tab.Screen name="Navigator" component={Navigator} options={{ title: 'Mapa' }}/>
    </Tab.Navigator>
    </BackgroundChat>

  );
}