import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';
import {Auth, DataStore} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';
import {User} from '../../models';

export const ProfileScreen = () => {
  const {dbUser, sub, setDbUser} = useAuthContext();

  const [name, setName] = useState(dbUser?.name ?? '');
  const [address, setAdress] = useState(dbUser.address ?? '');
  const [lat, setLat] = useState(dbUser.lat + ' ' ?? '0');
  const [lng, setLng] = useState(dbUser.lng + ' ' ?? '0');

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          sub,
        }),
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, updated => {
        (updated.name = name),
          (updated.address = address),
          (updated.lat = parseFloat(lat)),
          (lng = parseFloat(lng));
      }),
    );
    setDbUser(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={address} onChangeText={setAdress} placeholder="Adresse" />
      <Input value={lat} onChangeText={setLat} placeholder="Latitude" />
      <Input value={lng} onChangeText={setLng} placeholder="Longitude" />

      <Button title="Sauvegarder" onPress={onSave} />
      <Button title="Déconnexion" type="clear" onPress={() => Auth.signOut()} />
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
