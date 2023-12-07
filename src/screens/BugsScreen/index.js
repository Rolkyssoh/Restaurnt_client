import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@rneui/themed'
import { createBugs } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const BugsScreen = () => {
    const [title, setTitle] = useState()
    const [details, setDetails] = useState()
    const[loading, setLoading] =useState(false)
    const { dbUser } = useAuthContext()
    const navigation = useNavigation()

    const addNewBug = async () => {
        setLoading(true)
        try {
          const bug = await API.graphql(
            graphqlOperation(createBugs, { 
              input: {
                title,
                details,
                userID: dbUser.id,
              },
            }),
          );
          if(bug){
            navigation.goBack();
            setLoading(false)
          }
        } catch (e) {
          Alert.alert('Error', e.message);
          setLoading(false)
        }
    };

  return (
    <View style={styles.container}>
    <Text style={{marginVertical:60, fontWeight:'600', fontSize:20}}>Veillez soumettre le bug rencontré</Text>
      <Input 
        label="Titre"
        labelStyle={{color:'#000'}}
        placeholder='Titre du bug'
        value={title}
        onChangeText={setTitle}
      />
      <Input 
        inputContainerStyle={styles.textareaInput}
        label="Détails"
        labelStyle={{color:'#000'}}
        placeholder='Entrez les details du bugs svp'
        multiline
        numberOfLines={10}
        value={details}
        onChangeText={setDetails}
      />
      <Button 
        title="Envoyer"
        onPress={addNewBug}
        loading={loading}
        disabled={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'lightgrey',
        flex:1,
        // justifyContent:'center',
        alignItems:'center'
    },
    textareaInput:{
        height:200, 
        borderColor:'grey', 
        borderWidth:1, 
        // borderRadius:15, 
        padding:5
    },
})