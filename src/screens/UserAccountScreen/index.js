import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export const UserAccountScreen = () => {
  const navigatin = useNavigation();
  const {dbUser} = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.first_content}>
        <Text h4>Bonjour, {dbUser.name}</Text>
      </View>
      <View style={styles.second_view}>
        <View style={styles.link_part}>
          <Pressable
            onPress={() => navigatin.navigate('Profile')}
            style={{flexDirection: 'row'}}>
            <Entypo name="info-with-circle" size={24} color={'#000'} />
            <Text style={{fontSize: 18, marginLeft: 5}}>Mes Informations</Text>
          </Pressable>
          <Pressable onPress={() => Auth.signOut()} style={styles.logout_style}>
            <Entypo name="log-out" size={20} color="#000" />
            <Text style={{left: 5}}>Déconnexion</Text>
          </Pressable>
        </View>
        <Text style={styles.text_version}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  first_content: {height: 200, justifyContent: 'center', alignItems: 'center'},
  second_view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  link_part: {
    flex: 1,
    padding: 20,
  },
  logout_style: {
    //   marginTop: 'auto',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_version: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#fff',
  },
});
