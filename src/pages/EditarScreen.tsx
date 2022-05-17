import React, {useState, useContext} from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { PlantLogo } from '../components/PlantLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';



export const EditarScreen = ({route}:any) => {

  const {editarUser} = useContext(AuthContext)

  const {params} = route
  const { nombre, apellido, correo, direccion, ciudad } = params.usuario;

  const navigator = useNavigation();


  const [form, setForm] = useState({
    name: nombre, 
    lastname: apellido, 
    direction: direccion, 
    city: ciudad,
    password: ''
  });

  const { name,
          lastname,
          direction,
          city,
          password } = form;

  const onClick = () => {
    const uid = params.usuario.uid;
    console.log(uid)
    editarUser(uid, name, lastname, password , city, direction );

    Alert.alert('Datos Guardados', 'Los nuevos datos han sido almacenados',[{
      text: 'Ok',
      onPress: () => navigator.dispatch(CommonActions.goBack())

  }]);

  }


  const onChange = (value:any, field:any) => {
    setForm({
      ...form,
      [ field ]: value
  });
  }

  const todoOk = () => {
    return (name.length > 1 && lastname.length > 1 && city.length > 1 && direction.length > 1) ? true : false;
  }

  return (
    <View style={ styles.contanier }>
      <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />
      <PlantLogo />

      <View style={styles.sectionText}>
      <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigator.dispatch(CommonActions.goBack())}
        style={{}}
      >
        <Icon 
            name={ 'arrow-back-sharp' }
            color="white"
            size={ 35 }
            style={{ marginLeft: 20, marginRight: 20}}
        /> 
      </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>


      

      <View style={styles.contanierBlanco}>


        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          style={{ alignSelf: 'stretch' }}
        >
        <View style={styles.formContainer}>

          <Text style={ styles.label }>Nombre:</Text>
          <TextInput
              placeholder='Ingrese su nombre:'
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={ styles.inputField }
              selectionColor="black"
              onChangeText={ (value) => onChange(value, 'name') }
              value={ name }
              // onSubmitEditing={  }
              autoCapitalize='none'
              autoCorrect={ false }
          />
          <Text style={ styles.label }>Apellido:</Text>
          <TextInput
              placeholder='Ingrese su apellido:'
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={ styles.inputField }
              selectionColor="black"
              onChangeText={ (value) => onChange(value, 'lastname') }
              value={ lastname }
              // onSubmitEditing={  }
              autoCapitalize='none'
              autoCorrect={ false }
          />

          <Text style={ styles.label }>Contraseña:</Text>
          <TextInput
              placeholder='*********'
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={ styles.inputField }
              selectionColor="black"
              onChangeText={ (value) => onChange(value, 'password') }
              value={ password }
              // onSubmitEditing={  }
              secureTextEntry={ true }
              autoCapitalize='none'
              autoCorrect={ false }
          />

          <Text style={ styles.label }>Ciudad:</Text>
          <TextInput
              placeholder='Ingrese su ciudad:'
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={ styles.inputField }
              selectionColor="black"
              onChangeText={ (value) => onChange(value, 'city') }
              value={ city }
              // onSubmitEditing={  }
              autoCapitalize='none'
              autoCorrect={ false }
          />

          <Text style={ styles.label }>Dirección:</Text>
          <TextInput
              placeholder='Ingrese su dirección:'
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={ styles.inputField }
              selectionColor="black"
              onChangeText={ (value) => onChange(value, 'direction') }
              value={ direction }
              // onSubmitEditing={  }
              autoCapitalize='none'
              autoCorrect={ false }
          />

          <TouchableOpacity
            activeOpacity={ 0.9 }
            style={ styles.button }
            onPress={ onClick }
            disabled={ !todoOk() }
          >
            <Text style={ styles.buttonText }>Guardar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contanierBlanco: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 35,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25
  },
  contanier: {
    flex: 1,
  },
  sectionText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    marginTop: 50,
    paddingLeft: 0,
    marginLeft: 0,
  },
  title: {

    // marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)'
  },
  formContainer:{
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom:50
  },
  label:{
    marginTop: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  inputField:{
    color: 'black',
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    flexDirection:'row',
    backgroundColor: '#5856D6',
    height: 40,
    minWidth: 120,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
  },

});