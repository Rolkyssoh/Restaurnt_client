import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import imgEntry from '../../../assets/images/entry_screen1.jpg';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EntryScreen = () => {
    useEffect(() => {
        async function getPreviousRoute(){
            try {
                const previous = await AsyncStorage.getItem('@thePreviousRouteName')
                if(previous != "Welcome")
                    await AsyncStorage.setItem('@viewWelomeScreen', 'true')
            } catch (error) {
                console.log('Error while getting route in navigation::', error)
            } 
        }
    
        getPreviousRoute();
    },[])

  return (
    <ImageBackground
        resizeMode='stretch'
        source={imgEntry} 
        style={styles.container}
    > 
        <LinearGradient
          colors={['rgba(36, 150, 137, 0.77)', 'rgba(36, 150, 137, 0.999999)']}
          style={styles.contentContainer}
            start={{x: 0.2, y: -0.2}} 
            // end={{x: 0, y: 0}}
        >
            <Text style={{fontSize:20, fontWeight:'bold'}}>LOGO</Text>
        </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'transparent',
        //  backgroundColor:'rgba(0, 0, 0, 0.5)',
    },
    contentContainer: {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        // overflow:'hidden',
        alignSelf: 'stretch',
    },
})