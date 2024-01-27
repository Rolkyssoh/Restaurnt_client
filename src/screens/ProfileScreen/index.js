import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';
import {User, UserType} from '../../models';
import {createUser, updateUser} from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const {dbUser, sub, setDbUser, dbUserLocation} = useAuthContext();
  const navigation = useNavigation()

  const [name, setName] = useState(dbUser?.name ?? '');
  const [address, setAdress] = useState(dbUser?.address ?? '');
  const [phonenumber, setPhonenumber] = useState(dbUser?.phonenumber ?? '');
  const [lat, setLat] = useState(dbUser?.lat);
  const [lng, setLng] = useState(dbUser?.lng);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('in the component here!!!!')
    if (dbUserLocation !== null) {
      setLat(dbUserLocation.latitude);
      setLng(dbUserLocation.longitude);
    }
  }, [dbUserLocation]);

  const onSave = async () => {
    if (dbUser) {
      await editExistedUser();
    } else {
      await addNewUser();
    }
  };

  const addNewUser = async () => {
    setLoading(true)
    try {
      const user = await API.graphql(
        graphqlOperation(createUser, { 
          input: {
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            isActive:true,
            sub,
            type: UserType.CUSTOMER,
            phonenumber
          },
        }),
      );
      setDbUser(user.data.createUser);
      if(user.data){setLoading(false)}
    } catch (e) {
      setLoading(false)
      Alert.alert('Error', e.message);
      console.log('error while adding new user::', e)
    }
  };

  const editExistedUser = async () => {
    setLoading(true)
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          phonenumber,
          id: dbUser.id,
          // _version: dbUser._version,
        },
      }),
    );
    console.log('the updated user:', updatedUser);
    setDbUser(updatedUser.data.updateUser);
    if(updatedUser) {
      setLoading(false);
      navigation.goBack()
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Infos</Text>
      <Input 
        value={name} 
        onChangeText={setName} 
        placeholder="Name" 
        inputContainerStyle={styles.inputContainer}
      />
      <Input 
        value={address} 
        onChangeText={setAdress} 
        placeholder="Adresse" 
        inputContainerStyle={styles.inputContainer}
      />
      <Input 
        value={phonenumber} 
        onChangeText={setPhonenumber} 
        placeholder="Numéro de Tél" 
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        value={`${lat}`}
        onChangeText={setLat}
        placeholder="Latitude"
        disabled={lat}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        value={`${lng}`}
        onChangeText={setLng}
        placeholder="Longitude"
        disabled={lat}
        inputContainerStyle={styles.inputContainer}
      />

      <Button 
        title="Sauvegarder" 
        onPress={onSave} 
        buttonStyle={{backgroundColor:'#249689', borderRadius:10}}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    color: '#000',
  },
  inputContainer:{
    borderWidth:1, 
    borderRadius:10, 
    borderColor:'#249689'
  }
});
