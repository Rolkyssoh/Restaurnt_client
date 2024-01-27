import { View, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

export const CodeConfirmation = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Nous Envoyons Un Code</Text>
            <Text>
                votre code est en cours d'acheminement. pour vous connecter, 
                entrez le code que nous vous avons envoyé au +****6612.
                il peut prendre une minute pour arriver.
             </Text>
            <View style={styles.theContent}>
                <Input 
                    label='Code de confirmation' 
                    placeholder='Entrer votre code'
                    keyboardType='phone-pad' />
            </View>
            <Button title={'Confirmer'} buttonStyle={{backgroundColor:'red', marginVertical:15, borderRadius:10}} />
            <Button 
                title={'Renvoyez le code'} 
                buttonStyle={{ borderColor:'red', marginVertical:15, borderRadius:10}} 
                type='outline' 
                titleStyle={{color:'red'}}/>
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
        paddingHorizontal:20,
        marginTop:15
    },
})