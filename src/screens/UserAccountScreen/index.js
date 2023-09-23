import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import { Divider, Text} from '@rneui/themed';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const UserAccountScreen = () => {
  const navigatin = useNavigation();
  const {dbUser} = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <View >
          <Text style={{fontSize:35, fontWeight:'bold', color:'#fff'}}>Compte</Text>
        </View>

        <View style={{alignItems:'flex-end', paddingTop:35}}>
          <View style={styles.imgView}>
            <FontAwesome name="user" size={30} color="#fff" />
          </View>
          <Text style={{fontSize:10, fontWeight:'bold', color:'#fff'}}>
            Bonjour, 
            <Text style={{fontWeight:'300', color:'#fff'}}>{dbUser.name}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.infos_section}>
        <Text>Les informations de mon compte</Text>
      </View>
      <View>
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Changer le mot de passe</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
        <Divider color='#249689' />
        <Pressable onPress={() => navigatin.navigate('Profile')} style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Editer le profil</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
      </View>

      <View style={styles.support_section}>
        <Text>Support</Text>
      </View>
      <View>
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Tutoriel</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
        <Divider color='#249689' />
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Soumettre un bug</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Soumettre une demande de fonctionnalité</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </Pressable>
      </View>

      <View style={styles.footer_part}>
        <Pressable onPress={() => Auth.signOut()} style={styles.logout_style}>
          <Entypo name="log-out" size={20} color="#000" />
          <Text style={{left: 5}}>Déconnexion</Text>
        </Pressable>
      </View>
      <View style={{backgroundColor:'#f1f4f9'}}>
        <Text style={styles.text_version}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#249689'},
  header_content: {
    flexDirection:'row',
    height: 170, 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding:15
  },
  imgView:{
    backgroundColor:'lightgrey',
    height:60,
    width:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:3,
    borderColor:'blue',
    marginBottom:10
  },
  infos_section:{
    backgroundColor:'#f1f4f9',
    height:45,
    justifyContent:'center',
    borderTopLeftRadius:40,
    paddingHorizontal:15,
    borderBottomColor:'lightgrey',
    borderBottomWidth:1
  },
  support_section:{
    backgroundColor:'#f1f4f9',
    height:45,
    justifyContent:'center',
    paddingHorizontal:15,
    borderBottomColor:'#249689',
    borderBottomWidth:0.5
  },
  pressableStyle:{
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-between',
    backgroundColor:'#fff', 
    height:75, 
    padding:15
  },
  textPressable:{
    fontSize:16,
  },
  footer_part: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor:'#f1f4f9',
    borderTopColor:'lightgrey',
    borderTopWidth:1,
    justifyContent:'flex-end'
    
  },
  logout_style: {
    backgroundColor:'#fff',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderColor:'whitesmoke',
    borderWidth:2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_version: {
    alignSelf: 'flex-end',
    fontSize: 10,
    fontWeight:'100',
    color: '#000',
  },
});
