import { View, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@rneui/themed'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { Auth } from "aws-amplify"
// import { useAuthenticator } from '@aws-amplify/ui-react-native'

export const SignUpScreen = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordVisibility2, setPasswordVisibility2] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [rightIcon2, setRightIcon2] = useState('eye');

    const navigation = useNavigation()

    console.log({Auth})

    const doChangeVisibility = (target) => {
        if(target==='the_pwd'){ 
            if(rightIcon ==='eye'){// for the password field
                setRightIcon('eye-with-line');
                setPasswordVisibility(!passwordVisibility)
            } else if(rightIcon=='eye-with-line'){
                setRightIcon('eye');
                setPasswordVisibility(!passwordVisibility)
            }
        } else if(target==='the_cpwd') { // for the confirm password
            if(rightIcon2 ==='eye'){
                setRightIcon2('eye-with-line');
                setPasswordVisibility2(!passwordVisibility2)
            } else if(rightIcon2=='eye-with-line'){
                setRightIcon2('eye');
                setPasswordVisibility2(!passwordVisibility2)
            }
        }
    }

    // const doSignUp = () => {
    //     const { toSignUp } = useAuthenticator()
    // }

  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>Création de compte</Text>
        <View style={styles.theContent}>
            <Input 
                label='Numéro de téléphone' 
                placeholder='Entrer votre numéro de tél'
                keyboardType='phone-pad' />
            <Input 
                label='Mot de passe' 
                placeholder='Entrer votre mot de passe'
                secureTextEntry={passwordVisibility}
                autoCapitalize='none'
                rightIcon={<Entypo name={rightIcon} size={20} color={'#249689'} onPress={() =>doChangeVisibility('the_pwd')}/>} />
            <Input 
                label='Confirmer mot de passe' 
                placeholder='Confirmer mot de passe'
                secureTextEntry={passwordVisibility2}
                autoCapitalize='none'
                rightIcon={<Entypo name={rightIcon2} size={20} color={'#249689'} onPress={() =>doChangeVisibility('the_cpwd')}/>} />
        </View>
        <Button title={'Créer Compte'} buttonStyle={{backgroundColor:'#249689', marginVertical:15, borderRadius:10}} />
        <Pressable onPress={() =>navigation.navigate('login')} style={{justifyContent:'center', alignItems:'center',marginTop:15}}>
            <Text style={{color:'#249689', fontWeight:'bold', fontSize:16}}>Connexion</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'whitesmoke',
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30
    },
    textStyle:{
        fontSize:21,
        fontWeight:'bold',
        marginBottom:15
    },
    theContent:{
        padding:20
    }
})
