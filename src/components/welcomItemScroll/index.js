import { View, Text, useWindowDimensions, StyleSheet, Image } from 'react-native'
import React from 'react'

export const WelcomeItemScroll = ({item}) => {

    const { width } = useWindowDimensions()

  return (
    <View style={[styles.container, {width}]}>
        <Image source={item.image} style={[styles.image, {width, resizeMode:'center'}]} />

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontWeight:'800',
        fontSize:30,
        marginBottom:10,
        color:'#000',
        textAlign:'center',
    },
    description:{
        fontWeight:'500',
        color:'grey',
        textAlign:'center',
        paddingHorizontal:64,
    },
})

