import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigatior/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { StackNav } from './src/navigatior/StackNavigator';


const AppState = ({ children }: any) => {

  return ( 
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        {/* <Navigator /> */}
        <StackNav />
      </AppState>
    </NavigationContainer>
  )
}

export default App;