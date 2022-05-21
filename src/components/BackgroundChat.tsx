import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// interface Props {
//     children: JSX.Element | JSX.Element[];
// }

export const BackgroundChat = ({children}:any) => {
  return (
    <View style={{ flex: 1 }}>
        <LinearGradient 
            colors={[ '#5856D6','#AB8DD6', '#D9D6DE']}
            style={{ ...StyleSheet.absoluteFillObject}}
        />
        { children }
    </View>
  )
}
