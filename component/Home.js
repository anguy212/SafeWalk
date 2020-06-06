import React, {useEffect} from 'react';
import {
  Button, 
  View, 
  Text, 
  TextInput,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function useConstructor(callBack = () => {}) {
  const [hasBeenCalled, setHasBeenCalled] = React.useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

export default function HomeScreen({ navigation }) {
    const [keyword, SetKeyowrd] = React.useState('')
    const [name, setname] = React.useState('')
    const [nameTwo, setNameTwo] = React.useState('')
    const [walkImage, setWalkImage] = React.useState(false)
    const [inter, setInter] = React.useState(0)

    function toggleImage()
    {
      setWalkImage(walkImage => !walkImage)
    }

    useConstructor(()=>
    {
      setInter(setInterval(toggleImage, 500))
    })

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
      clearInterval(inter)
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
      clearInterval(inter)
      navigation.navigate('Map')
    }
  
    return (
    <View
      style={{ flex: 1, alignItems: 'stretch', flexDirection: 'column', borderWidth: 25, borderColor: 'ivory',
      borderTopWidth: 50, borderBottomWidth: 30}}>
      <View 
        style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around', flexDirection: 'column', borderWidth: 2, borderColor: 'dimgray',
        borderTopWidth: 2, borderBottomWidth: 2}}>
          <View 
          style= 
            {{flex:1, alignItems: 'center', justifyContent: 'flex-end', borderBottomColor: "lemonchiffon", backgroundColor: "lemonchiffon",
              borderBottomWidth: 55, alignContent: 'stretch'}}>
            <View style = {{borderBottomWidth: 10, borderBottomColor: "lemonchiffon"}}>
              <Image
                source = { walkImage ? require('../assets/walk1.png') : require('../assets/walk2.png')}
                style = {{width:160, height:160}}
              />
            </View>
            <TextInput
              style = { {height: 40, paddingHorizontal: 3, width: 120, borderColor: 'dimgray', borderWidth: 3, marginBottom: 10} }
              placeholder = "Keyword"
              onChangeText = {text => SetKeyowrd(text.toLowerCase())}
              value = {keyword}
            />
            <TextInput
              style = { { height: 40, width: 120, paddingHorizontal: 3, borderColor: 'dimgray', borderWidth: 3 } }
              placeholder = "Name"
              onChangeText = {text => setname(text)}
              value = {name}
            />
            <Button
              style = {{borderTopWidth: 10}}
              title="Start Walk"
              onPress={goingToVoice}
            />
          </View>
          <View 
            style =
            {{flex:1, alignItems: 'center', justifyContent: 'flex-end', borderTopColor: "dimgrey", borderTopWidth: 2,
              borderBottomWidth: 70, borderBottomColor: "khaki", backgroundColor: "khaki",
              alignContent: 'stretch'}}>
            <View style = {{borderBottomWidth: 10, borderBottomColor: "khaki"}}>
              <Image
                source = { walkImage ? require('../assets/binoculars1.png') : require('../assets/binoculars2.png')}
                style = {{width:160, height:160}}
              />
            </View>
            <TextInput
                style = { {height: 40, width: 120, paddingHorizontal: 3, borderColor: 'dimgray', borderWidth: 3} }
                placeholder = "Name"
                onChangeText = {text => setNameTwo(text.toLowerCase())}
                value = {nameTwo}
              />
            <Button
              style = {{borderTopWidth: 10}}
              title="See Map"
              onPress={goingToMap}
            />
          </View>
        </View>
      </View>
    );
  }