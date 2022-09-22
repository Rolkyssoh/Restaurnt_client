import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button, Input} from '@rneui/themed';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Input placeholder="Name" />
      <Input placeholder="Adress" />
      <Input placeholder="Latitude" />
      <Input placeholder="Longitude" />

      <Button title="Sauvegarder" />
      <Button title="Déconnexion" type="clear" />
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
