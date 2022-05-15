import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { StackNav } from './src/navigatior/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { UsuarioProvider } from './src/context/UsuarioContext';
import { SocketProvider } from './src/context/SocketContext';
import { ChatProvider } from './src/context/ChatContext';


const AppState = ({ children }: any) => {

  return ( 
    <ChatProvider>
      <AuthProvider>
        <UsuarioProvider>
        <SocketProvider>
          <PermissionsProvider>
            { children }
          </PermissionsProvider>
        </SocketProvider>
        </UsuarioProvider>
      </AuthProvider>
    </ChatProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNav />
      </AppState>
    </NavigationContainer>
  )
}

export default App;