import React, {useEffect} from 'react';
import {
  Button, 
  View, 
  Text, 
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function HomeScreen({ navigation }) {
    const [keyword, SetKeyowrd] = React.useState('')
    const [name, setname] = React.useState('')
  
    signInHandler = user =>
    {
      if(!user)
      {
        auth()
        .signInAnonymously()
        .then(() => {
           console.log("log in new user")
         })
        .catch(error => {
          console.error(error);
        });
      }
    }
  
    function goingToVoice()
    {
      auth().onAuthStateChanged(signInHandler)
      holder1 = keyword
      holder2 = name
      SetKeyowrd('')
      setname('')
      navigation.navigate('voiceListen', {key : holder1, name : holder2, uid: auth().currentUser.uid})
    }
  
    function addAssignees(){
      auth().onAuthStateChanged(signInHandler)
      database()
      .ref('/users/' + auth().currentUser.uid + '/assignees/')
      .set(
        {
          bob: {latitude: 37.792252, longitude: -122.420540},
          tom: {latitude: 37.792852, longitude: -122.420740}
        }
      )
    }
  
    function goingToMap(){
      navigation.navigate('Map')
    }
  
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style = {{borderBottomWidth: 10}}>
          Home Screen
        </Text>
        <TextInput
          style = { {height: 40, width: 120, borderColor: 'grey', borderWidth: 3, marginBottom: 10 } }
          placeholder = "Keyword"
          onChangeText = {text => SetKeyowrd(text.toLowerCase())}
          value = {keyword}
        />
        <TextInput
          style = { { height: 40, width: 120, borderColor: 'grey', borderWidth: 3 } }
          placeholder = "Name"
          onChangeText = {text => setname(text)}
          value = {name}
        />
        <Button
          style = {{borderTopWidth: 10}}
          title="Start Walk"
          onPress={goingToVoice}
        />
        <Button
          style = {{borderTopWidth: 10}}
          title="See Map"
          onPress={goingToMap}
        />
      </View>
    );
  }