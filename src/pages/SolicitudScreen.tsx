import { StackActions } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Pressable, Switch, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { UsuarioContext } from '../context/UsuarioContext';
import { Box, CheckIcon, Select } from "native-base";
import { Table } from '../components/Table';
import { SocketContext } from '../context/SocketContext';

export const SolicitudScreen = ({ navigation }: any) => {
  const popAction = StackActions.pop(1);
  const popActions = StackActions.pop(2);
  const { solicitud, deleteSoli, servicios, obtenerDetalleSolicitud, servicio, isLoadingModal, quitarLoading, isOpenModal, cerrarModalSolicitud } = useContext(UsuarioContext);
  const {socket} = useContext(SocketContext)

  const [isEnabled, setIsEnabled] = useState(solicitud.confirmacion);
  const [isSecundEnabled, setIsSecundEnabled] = useState(solicitud.start);
  const [isThirdEnabled, setIsThirdEnabled] = useState(solicitud.finish);

  const [isVisible, setIsVisible] = useState(false);
  const [onLoad, setOnLoad] = useState(true);
  const [service, setService] = useState('');
  const [form, setForm] = useState({
    precio: ''
  });

  useEffect(() => {
    setOnLoad(true);
    setIsSecundEnabled(solicitud.start)
    setIsThirdEnabled(solicitud.finish)
    esperarCargaSolicitud();
  }, [solicitud])
  

  useEffect(() => {
    if ( isOpenModal ) {
      setIsVisible(true)
      openEditModal();
    }
    
  }, [isOpenModal])
  

  useEffect(() => {
    const valueConfirm = solicitud.confirmacion
    setIsEnabled(valueConfirm)
  }, [solicitud])

  useEffect(() => {
    if (deleteSoli) {
      volverAtras();
    }
  }, [deleteSoli])

  useEffect(() => {
      const idSolicitud = solicitud._id;
      obtenerDetalleSolicitud(idSolicitud);
  }, [solicitud])


  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  };
  const toggleSecundSwitch = () => {
    setIsSecundEnabled(!isSecundEnabled)
  };
  const toggleThirdSwitch = () => {
    setIsThirdEnabled(!isThirdEnabled)
  };


  const volverAtras = () => {
    console.log('Salgo')
    navigation.dispatch(popActions);
  }

  const openEditModal = () => {
    let precioEdit = servicio.precio
    precioEdit = String(precioEdit)
    setService(servicio.idTipoServicio._id)
    setForm({
      precio: precioEdit
    })
  }

  const onSave = () => {
    const sid = solicitud._id;
    // cambio-detalle-solicitud
    socket.emit( 'cambio-detalle-solicitud',{
      id: servicio._id,
      idSolicitud: sid,
      idTipoServicio: service,
      precio: form.precio
    })

    setIsVisible(false);
    setService('');
    setForm({
      precio: ''
    })
    cerrarModalSolicitud()
  }


  const onCreate = () => {
    const sid = solicitud._id;
   
    socket.emit( 'crear-detalle-solicitud',{
      idSolicitud: sid,
      idTipoServicio: service,
      precio: form.precio
    })
    setIsVisible(false);
    setService('');
    setForm({
      precio: ''
    })
    cerrarModalSolicitud()
  } 

  const onChange = (value:any, field:any) => {
    setForm({
      ...form,
      [ field ]: value
  });
  }

  const esperarCargaSolicitud = () => {
    setTimeout(() => {
      setOnLoad(false);
    }, 1);
  }

  const deshabilitarNuevoServicio = () => {
    return (solicitud.confirmacion) ? false : true; 
  }

  const deshabiltarInicioServicio = () => {
    return (solicitud.confirmacion) ? true : false; 
  }

  return (
    <View style={styles.conteiner}>
      <View style={styles.subConteiner}>

        <Text style={styles.title}>Solicitud </Text>

        {/* ------------------------ Modal ------------------------------ */}
        <Modal
          animationType='fade'
          visible={isVisible}
          transparent={true}
        >
          <View style={styles.containerModal}>

            <View style={styles.modalScreen}>

              <View style={styles.sectionTitle}>
                <Text style={{ fontSize: 20, 
                  fontWeight: 'bold', 
                  marginLeft: 20, 
                  color: 'black' }}>{(isOpenModal) ? "Editar Servicio" : "Agregar Servicio"}</Text>
              </View>

              
              {
                (isLoadingModal) 
                  ? (<ActivityIndicator 
                    size={ 50 }
                    color='black'
                  />)
                  : ( <>
              <View style={{marginLeft: 22, bottom:30}}>
              <Text style={styles.label}>Servicio:</Text>
                <Box 
                  w="3/4" 
                  maxW="600"
                >
                  <Select 
                    selectedValue={service} 
                    bgColor='violet.50'

                    minWidth="300" 
                    accessibilityLabel="Elija el Servicio" 
                    fontSize="lg"
                    placeholder="Elija el Servicio" 
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }} 
                    mt={1} 
                    onValueChange={itemValue => setService(itemValue)}
                  >
                    {
                      servicios.map( (serv: any, index:any) => (
                        <Select.Item
                          
                          label={serv.nombre}
                          value={serv._id}
                          key={index}
                        />
                      ))
                    }
                  </Select>
                </Box>

              </View>
              <View style={{...styles.form, bottom:25}}>
                <Text style={styles.label}>Precio:</Text>
                <TextInput
                  placeholder='Ingresar valor'
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  style={styles.inputField}
                  selectionColor="black"
                  onChangeText={(value) => onChange(value, 'precio')}
                  value={form.precio}
                  // onSubmitEditing={  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='number-pad'
                />

              </View>
                    
              </>)
              }

              


              <View style={styles.sectionBtn}>

              {
                (isOpenModal)
                  ? (
                    <Pressable
                    onPress={onSave}
  
                    style={{ ...styles.blackButton, marginBottom: 10, alignSelf: 'center' }}
                  >
                    <Text style={styles.buttonText}>Guardar</Text>
                  </Pressable>
                  )
                  :(
                <Pressable
                  onPress={onCreate}

                  style={{ ...styles.blackButton, marginBottom: 10, alignSelf: 'center' }}
                >
                  <Text style={styles.buttonText}>Crear</Text>
                </Pressable>
                  )
              }
                

               

                <Pressable
                  onPress={() => {setIsVisible(false), setService(''), setForm({
                    precio: ''
                  }), cerrarModalSolicitud()}}

                  style={{ marginBottom: 15 }}
                >
                  <Text style={{ ...styles.buttonTextModal, alignSelf: 'center' }}>Cancelar</Text>
                </Pressable>

              </View>


            </View>

          </View>
        </Modal>

        {/* ------------------------ Modal fin ------------------------------ */}

        {
          (onLoad)
            ? (<ActivityIndicator 
              size={ 50 }
              color='black'
            />)
            : (<>
          <Text style={{ margin: 20 }}>Iniciar Servicio:
          <Text style={{margin: 5}}>
            {JSON.stringify(solicitud.start, null, 5)}
          </Text>
          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={ (solicitud.confirmacion) 
                ? (isSecundEnabled ? "#5856D6" : "#5856D6") 
                : (isSecundEnabled ? "#D9D6DE" : "#D9D6DE") }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSecundSwitch}
            value={isSecundEnabled}
            disabled={!deshabiltarInicioServicio()}
          />
        </Text>

        <Text style={{ margin: 20 }}>Finalizar Servicio:
          <Text style={{margin: 5}}>
            {JSON.stringify(solicitud.finish, null, 5)}
          </Text>
          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isThirdEnabled ? "#D9D6DE" : "#D9D6DE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleThirdSwitch}
            value={isThirdEnabled}
            disabled
          />
        </Text>
  
        <Text style={{ margin: 20 }}>Confirmación:

          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isEnabled ? "#D9D6DE" : "#D9D6DE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled
          />
        </Text>
            
            
            </>

            )
        }

        

        <View style={styles.containerTable}>
          <Table />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {setIsVisible(true), quitarLoading()} }
          style={ (solicitud.confirmacion) ? {...styles.blackButton, marginBottom: 10, marginTop: 10, backgroundColor: '#656565'} : {...styles.blackButton, marginBottom: 10, marginTop: 10}}
          disabled={!deshabilitarNuevoServicio()}
        >
          <Text style={styles.buttonText}>Nuevo Servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.dispatch(popAction)}
          style={{ ...styles.blackButton, marginTop: 10 }}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  subConteiner: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: 25,
  },
  blackButton: {
    height: 45,
    width: 200,
    backgroundColor: '#1c1c1c',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    elevation: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  buttonTextModal: {
    color: '#5856D6',
    fontSize: 18,
    // fontWeight: '400'

  },
  redButton: {
    height: 45,
    width: 200,
    backgroundColor: '#c9302c',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    elevation: 6
  },
  FAButton: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: '#c9302c',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalScreen: {
    width: 350,
    height: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 10
  },
  sectionTitle: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    height: 65,
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
  sectionBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor:'red'
  },
  label: {
    marginTop: 25,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputField: {
    color: 'black',
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 10
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  },
  containerTable: {
    height: 230,
    marginTop: 30,
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
});