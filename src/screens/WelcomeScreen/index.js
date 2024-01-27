import { View, Text,Dimensions, StyleSheet, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import {Button} from '@rneui/themed';
import { Paginator, WelcomeItemScroll } from '../../components';
import { useNavigation } from '@react-navigation/native';

const exampleData =[
    {
        id:'1',
        title: 'Quick and easy payment',
        description: 'Grow your business by training',
        image:require('../../../assets/images/welcome1.png')
    },
    {
        id:'2',
        title: 'The test of carousel',
        description: 'the description of this',
        image:require('../../../assets/images/welcome2.png')
    },
    {
        id:'3',
        title: 'And other title for test',
        description: 'Description for the other title test',
        image:require('../../../assets/images/welcome3.png')
    },
]

export const WelcomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigation = useNavigation()

    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = () => {
        if(currentIndex < exampleData.length - 1){
            slidesRef.current.scrollToIndex({index: currentIndex +1})
        } else {
            console.log('It is the last item!!!')
            navigation.navigate('HomeTabs')
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.sliderContent}>
            <FlatList 
                data={exampleData}
                renderItem={({item}) => <WelcomeItemScroll item={item} /> }
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: { contentOffset:{x:scrollX}}}], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
        </View>
        
        <Paginator data={exampleData} scrollX={scrollX} />

        <View style={styles.buttonContent}>
            <Button 
                title={"Suivant"}
                buttonStyle={styles.button1Styles}
                onPress={scrollTo}
            />
            <Button 
                titleStyle={{color:'#000'}}
                title={"Sauter"} 
                buttonStyle={styles.button2Styles}
                onPress={() => navigation.navigate('login')}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    sliderContent:{
        flex:1,

    },
    buttonContent:{
        marginBottom:10,
        marginHorizontal:15
    },
    button1Styles:{
        backgroundColor:'#FF5963', 
        marginVertical:7,
        height:53,
        borderRadius:10,

        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 6,
        },
        shadowOpacity: 0.52,
        shadowRadius: 5.46,

        elevation: 2,
    },
    button2Styles:{
        backgroundColor:'#fff', 
        marginVertical:5,
        height:53,
        borderColor:'lightgrey',
        borderWidth:1,
        borderRadius:10
    }
})
