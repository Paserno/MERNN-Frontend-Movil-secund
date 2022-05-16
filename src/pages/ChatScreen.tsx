import React, {useContext, useEffect} from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { BackgroundChat } from '../components/BackgroundChat';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SendMessage } from '../components/chat/SendMessage';
import { InComingMessage } from '../components/chat/InComingMessage';
import { OutComingMessage } from '../components/chat/OutComingMessage';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';



export const ChatScreen = ({route}: any) => {

    // En los params.id se recibe el id de la persona seleccionada.
    const { params} = route;
    const { user } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    
    const navigator = useNavigation();

    const renderItem = ({item}:any) => (
      ( item.para === user?.uid)
      ? <OutComingMessage mss={ item }/>
      : <InComingMessage mss={ item }/>     
    )

  return (
    
    <BackgroundChat>
            <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />

        <View style={ styles.sectionText }>
      <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigator.dispatch(CommonActions.goBack())}
    
      >
        <Icon 
            name={ 'arrow-back-sharp' }
            color="white"
            size={ 35 }
            style={{ marginLeft: -20}}
        /> 
      </TouchableOpacity>
      <Text style={ styles.title}>Chat: {params.nombre}</Text>
      <TouchableOpacity
        activeOpacity={ 0.8 }
      >
      <Icon 
          name={ 'ellipsis-vertical-sharp' }
          color="white"
          size={ 34 }
          style={{ marginRight: 20}}
      /> 
      </TouchableOpacity>
    </View>

    <View style={ styles.contanierBlanco}>
      <View style={ styles.chatMessage}>
        {/* <ScrollView > */}
        <FlatList 
              data={ chatState.mensajes }
              keyExtractor={ (item) => item._id }
              renderItem={ renderItem }
              showsVerticalScrollIndicator={ false}
              style={{ width: '100%' }}
              contentContainerStyle={{ justifyContent: 'flex-end' }}
              inverted
            />
            {/* <OutComingMessage />
            
            <InComingMessage />
            <OutComingMessage />
            <OutComingMessage />
            <InComingMessage />
            <InComingMessage /> */}
        {/* </ScrollView> */}

      </View>
        <SendMessage  value={params}/>
    </View>

      
    </BackgroundChat>
  )
}

const styles = StyleSheet.create({
    contanierBlanco: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 10,
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
    },
    contanier: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      
    },
    chatMessage: {
      flex: 1,
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
      marginTop: 1,
      marginBottom: 72,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      // backgroundColor: 'black',
      
    },
    
    sectionText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 30,
      paddingLeft: 0,
      marginLeft: 50,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 0.85)'
    }
  
  });