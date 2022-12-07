import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';
import {User} from '../../models';
import {createUser, updateUser} from '../../graphql/mutations';

export const ProfileScreen = () => {
  const {dbUser, sub, setDbUser} = useAuthContext();

  const [name, setName] = useState(dbUser?.name ?? '');
  const [address, setAdress] = useState(dbUser?.address ?? '');
  const [lat, setLat] = useState(dbUser?.lat + ' ' ?? '0');
  const [lng, setLng] = useState(dbUser?.lng + ' ' ?? '0');

  const onSave = async () => {
    if (dbUser) {
      // await updateUser();
      await editExistedUser();
    } else {
      await addNewUser();
    }
  };

  // const createUser = async () => {
  //   try {
  //     const user = await DataStore.save(
  //       new User({
  //         name,
  //         address,
  //         lat: parseFloat(lat),
  //         lng: parseFloat(lng),
  //         sub,
  //       }),
  //     );
  //     setDbUser(user);
  //   } catch (e) {
  //     Alert.alert('Error', e.message);
  //   }
  // };
  const addNewUser = async () => {
    try {
      const user = API.graphql(
        graphqlOperation(createUser, {
          input: {
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub,
          },
        }),
      );
      setDbUser(user.data.createUser);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  // const updateUser = async () => {
  //   const user = await DataStore.save(
  //     User.copyOf(dbUser, updated => {
  //       (updated.name = name),
  //         (updated.address = address),
  //         (updated.lat = parseFloat(lat)),
  //         (lng = parseFloat(lng));
  //     }),
  //   );
  //   setDbUser(user);
  // };

  const editExistedUser = async () => {
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
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
