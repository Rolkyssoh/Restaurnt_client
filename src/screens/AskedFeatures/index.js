import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@rneui/themed'
import { createAskedFeatures } from '../../graphql/mutations'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import {generateClient} from 'aws-amplify/api';
import { UserType } from '../../models'

export const AskedFeatures = () => {
    const [title, setTitle] = useState()
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(false)
    const { dbUser } = useAuthContext()
    const navigation = useNavigation()
    const client = generateClient()

    const addNewFeature = async () => {
      setLoading(true)
      const inputCustomed = {
          title,
          details,
      }

      if(dbUser.type === UserType.CUSTOMER){
        inputCustomed.userID = dbUser.id
      } else if(dbUser.type === UserType.DRIVER){
        inputCustomed.courierID = dbUser.id
      }

        try {
          const feature = await client.graphql({
            query: createAskedFeatures,
            variables: {
              input: inputCustomed
            }
          })
          if(feature){
            setLoading(false);
            navigation.goBack()
          }
        } catch (e) {
          Alert.alert('Error', e);
          console.log('error while adding:::', e)
          setLoading(false)
        }
    };

  return (
    <View style={styles.container}>
        <Text style={{marginVertical:60, fontWeight:'600', fontSize:20}}>Veillez soumettre votre fonctionnalité</Text>
        <Input 
          label="Titre"
          labelStyle={{color:'#000'}}
          placeholder='Titre de la fonctionnalité'
          value={title}
          onChangeText={setTitle}
        />
        <Input 
          inputContainerStyle={styles.textareaInput}
          label="Détails"
          labelStyle={{color:'#000'}}
          placeholder='Entrez les details de la fonctionnalité'
          multiline
          numberOfLines={10}
          value={details}
          onChangeText={setDetails}
        />
        <Button 
          title="Soumettre"
          onPress={addNewFeature}
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
        alignItems:'center'
    },
    textareaInput:{
        height:200, 
        borderColor:'grey', 
        borderWidth:1, 
        padding:5
    },
})
