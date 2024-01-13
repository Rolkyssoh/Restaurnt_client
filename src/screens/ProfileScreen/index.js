import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';
import {User, UserType} from '../../models';
import {createUser, updateUser} from '../../graphql/mutations';

export const ProfileScreen = () => {
  const {dbUser, sub, setDbUser, dbUserLocation} = useAuthContext();

  const [name, setName] = useState(dbUser?.name ?? '');
  const [address, setAdress] = useState(dbUser?.address ?? '');
  const [phonenumber, setPhonenumber] = useState(dbUser?.phonenumber ?? '');
  const [lat, setLat] = useState(dbUser?.lat);
  const [lng, setLng] = useState(dbUser?.lng);

  useEffect(() => {
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
    try {
      const user = await API.graphql(
        graphqlOperation(createUser, { 
          input: {
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub,
            type: UserType.CUSTOMER,
            phonenumber
          },
        }),
      );
      user.data.createUser._deleted === null && setDbUser(user.data.createUser);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const editExistedUser = async () => {
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          phonenumber,
          id: dbUser.id,
          _version: dbUser._version,
        },
      }),
    );
    console.log('the updated user:', updatedUser);
    setDbUser(updatedUser.data.updateUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Infos</Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={address} onChangeText={setAdress} placeholder="Adresse" />
      <Input value={phonenumber} onChangeText={setPhonenumber} placeholder="Numéro de Tél" />
      <Input
        value={`${lat}`}
        onChangeText={setLat}
        placeholder="Latitude"
        disabled={lat}
      />
      <Input
        value={`${lng}`}
        onChangeText={setLng}
        placeholder="Longitude"
        disabled={lat}
      />

      <Button title="Sauvegarder" onPress={onSave} />
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
});
