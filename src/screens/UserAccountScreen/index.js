import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import { Divider, Text} from '@rneui/themed';
import {API, Auth, JS, Storage, graphqlOperation} from 'aws-amplify';
import {Image} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AWS from 'aws-sdk';
import Config from 'react-native-config'
import { updateUser } from '../../graphql/mutations';

AWS.config.update({
  accessKeyId: Config.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: Config.REACT_APP_S3_SECRET_ACCESS_KEY,
});

export const UserAccountScreen = () => {
  const navigatin = useNavigation();
  const {dbUser} = useAuthContext();
   const s3 = new AWS.S3();

   const [usrPicture, setUsrPicture] = useState();
   const [filePath, setFilePath] = useState();
   const [thePath, setThePath] = useState();
   const [theBody, setTheBody] = useState()

  useEffect(() => {
    if (dbUser.picture) {
      const params = {
        Bucket: Config.S3_BUCKET_ITEM,
        Key: `${dbUser.picture}`,
      };
      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          console.log('we have some error:', err, err.stack);
        } else {
          setUsrPicture(data.toString());
          console.log('the image:::::', data)
        }
      });
    }
  }, [dbUser])

  const options = {
    title:"Selectionner une image",
    type:"library",
    options:{
      maxHeight:200,
      maxWidth:200,
      selectionLimit:1,
      mediaType:'photo',
      includeBase64:false
    }
  }

  const doAddPicture = async () => {
    const response = await launchImageLibrary(options)
    console.log('the testtt::::', response.assets)
    if(response.didCancel){
      console.log('User cancelled image picker');
    } else if(response.error){
      console.log('ImagePicker Error: ', response.error);
    } else if(response.customButton){
        console.log(
        'User tapped custom button: ',
        response.customButton
        );
        alert(response.customButton);
    } else {
      setFilePath(response.assets[0])
      setThePath(response.assets)
      uploadFile(response.assets)
    }
  }

  const updateProfilePicture = async (fileName) => {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            _version: dbUser._version,
            picture:fileName,
            id: dbUser.id,
          },
        }),
      );
  }

  useEffect(() => {
    if(filePath){
      console.log('the argumment::::', filePath)
      let data = new FormData();
      data.append('File',filePath)
      // data.append('File', {
      //   uid: filePath.uri,
      //   type: filePath.type,
      //   name: filePath.fileName,
      //   // size: filePath.fileSize
      // });
      let theTest = new File(data._parts,filePath.fileName,{type: filePath.type, lastModified:Date.now()})
      // theTest._data.size = filePath.fileSize;
      console.log('the fileee:::', theTest)
      console.log('the form dataaaa:::', data._parts[0][1])
      setTheBody(data._parts[0])
    }
  },[filePath])

  const uploadFile = async (theFile) => {

    const params = {
      Bucket: Config.S3_BUCKET_ITEM,
      Key: theFile[0].fileName,
      Body:theBody,
    };
        // var upload = s3.upload(params).promise();
        // console.log('the uploadeedd:::', upload) Progr@mm@t!on
        var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => console.log(
            "Uploading " + Math.round((evt.loaded * 100) / evt.total) + "%"
        ))
        .promise();

        upload.then((value) => {
            console.log('the data updatedddd::::', value)
            if(value)
              updateProfilePicture(theFile.fileName)
            alert("File uploaded successfully.");
        });

      // const formdata = new FormData();
      // formdata.append("file", theFile);
      // console.log({ theFile });
      // try {
      //     const result = await Storage.put(theFile.fileName, formdata, {
      //         contentType: theFile.type,
      //         region: "us-east-1",
      //     });
      //     console.log("the result", result);
      // } catch (error) {
      //     console.log("the error while uploading file:", error);
      // }
    };

  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <View >
          <Text style={{fontSize:35, fontWeight:'bold', color:'#fff'}}>Compte</Text>
        </View>

        <View style={{alignItems:'flex-end', paddingTop:35}}>
          <FontAwesome style={styles.iconEditPicture} name="plus-circle" size={20} color="#fff" onPress={doAddPicture} />
          <View style={styles.imgView}>
            { dbUser.picture ? 
              <Image source={{uri: (filePath && filePath?.uri) ?? usrPicture }} style={styles.image} resizeMode="cover" /> :
              // <FontAwesome name="user" size={30} color="#249689"/> :
              <FontAwesome name="user" size={30} color="#249689"/> }

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
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </Pressable>
        <Divider color='#249689' />
        <Pressable onPress={() => navigatin.navigate('Profile')} style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Editer le profil</Text>
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </Pressable>
      </View>

      <View style={styles.support_section}>
        <Text>Support</Text>
      </View>
      <View>
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Tutoriel</Text>
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </Pressable>
        <Divider color='#249689' />
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Soumettre un bug</Text>
          <Ionicons name="chevron-forward" size={25} color="gray" />
        </Pressable>
        <Pressable style={styles.pressableStyle}>
          <Text style={styles.textPressable}>Soumettre une demande de fonctionnalité</Text>
          <Ionicons name="chevron-forward" size={25} color="gray" />
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
  iconEditPicture:{
    position:'absolute',
    marginTop:20,
    marginRight:21,
    right:0,
    zIndex:1,
    alignSelf:'center',
  },
  imgView:{
    backgroundColor:'#fff',
    height:60,
    width:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.5,
    borderColor:'blue',
    marginBottom:10
  },
  image: {
    height: 59, 
    width:59,
    aspectRatio: 1, 
    borderRadius: 30,
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
