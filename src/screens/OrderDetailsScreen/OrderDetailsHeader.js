import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AWS from 'aws-sdk';
import Config from 'react-native-config'
import { englishToFrench } from '../../translation';
import { getStructure } from '../../graphql/queries';
import {generateClient} from 'aws-amplify/api';

AWS.config.update({
  accessKeyId: Config.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: Config.REACT_APP_S3_SECRET_ACCESS_KEY,
});

dayjs.extend(relativeTime);


export const OrderDetailsHeader = ({order}) => {
  const [currentStruct, setCurrentStruct] = useState(null);
  const s3 = new AWS.S3();
   const client = generateClient()

  useEffect(() => {
    if(order){
      getStructureByHisIdInOrder(order.structureID)
    }
  },[order.structureID])

  const getStructureByHisIdInOrder = async (structID) => {
    const structureInOrder = await client.graphql({
      query: getStructure,
      variables: {id: structID}
    })
    setCurrentStruct(structureInOrder.data.getStructure);
  }

  return (
    <View>
      <View style={styles.screenContainer}>
        <Image
          source={{uri: currentStruct?.image_url}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{currentStruct?.name}</Text>

          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.subtitleStatus}>
              {englishToFrench[order.status]} &#8226;{' '}
            </Text>
            <Text style={styles.subtitleDate}>
              {dayjs(order.createdAt).fromNow(true)}
            </Text>
          </View>

          <Text style={styles.menuTitle}>Votre Commande</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {},
  contentContainer: {margin: 10},
  image: {width: '100%', aspectRatio: 4 / 2},
  title: {fontSize: 30, fontWeight: '600', marginVertical: 10, color: '#000'},
  subtitleStatus: {
    color:'#249689', 
    fontSize:15, 
    fontWeight:'300'
  },
  subtitleDate: {
    color: '#525252', 
    fontSize: 12,
    fontWeight:'300'
  },
  menuTitle: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight:'300',
    letterSpacing: 0.7,
    color: '#000',
  },
});