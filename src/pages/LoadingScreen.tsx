import React, { useContext } from 'react'
import { ActivityIndicator, View, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const LoadingScreen = () => {

  const { logOut } = useContext( AuthContext );


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <ActivityIndicator 
          size={ 50 }
          color='black'
        />
        <View style={{ position: 'absolute', bottom: 20}}>
          <Button 
            title='logout'
            color='#dc3545'
            onPress={ logOut }
          />
        </View>
    </View>
  )
}
