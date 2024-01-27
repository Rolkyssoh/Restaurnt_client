import { View, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@rneui/themed'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const navigation = useNavigation()

    const doChangeVisibility = () => {
        if(rightIcon ==='eye'){
            setRightIcon('eye-with-line');
            setPasswordVisibility(!passwordVisibility)
        } else if(rightIcon=='eye-with-line'){
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Se connecter</Text>
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
                    rightIcon={<Entypo name={rightIcon} size={20} color={'#249689'} onPress={doChangeVisibility}/>} />
            </View>
            <Button onPress={() => navigation.navigate('confirmCode')} title={'Se connecter'} buttonStyle={{backgroundColor:'#249689', marginVertical:15, borderRadius:10}} />
            <View style={styles.rowPressable}>
                <Pressable onPress={() => navigation.navigate('resetPwd')} style={{justifyContent:'center', alignItems:'center',marginTop:15}}>
                    <Text style={{color:'#249689', fontWeight:'bold', fontSize:16}}>Mot de passe oublié?</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('signUp')} style={{justifyContent:'center', alignItems:'center',marginTop:15}}>
                    <Text style={{color:'#249689', fontWeight:'bold', fontSize:16}}>Créer compte</Text>
                </Pressable>
            </View>
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
    },
    rowPressable:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})