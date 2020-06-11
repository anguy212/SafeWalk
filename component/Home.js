import React from 'react';
import {
  Button, 
  View, 
  Text, 
  TextInput,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

export default class HomeScreen extends React.Component {
    constructor({props, route, navigation})
    {
      super(props)
      this.state = {
        keyword: '',
        name: '',
        nameTwo: '',
        walkImage: true
      }
      this.navigation = navigation
    }

    toggleImage = () =>
    {
      this.setState({
        walkImage: !this.state.walkImage
      })
    }

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

    componentDidMount(){
      this.interval = setInterval(this.toggleImage, 500)
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    goingToVoice()
    {
      auth().onAuthStateChanged(this.signInHandler)
      holder1 = this.state.keyword
      holder2 = this.state.name
      this.setState({
        keyword: '',
        name: ''
      })
      this.navigation.navigate('voiceListen', {key : holder1, name : holder2, uid: auth().currentUser.uid})
    }
  
    goingToMap(){
      holder1 = this.state.nameTwo
      this.setState({
        nameTwo: ''
      })
      Geolocation.getCurrentPosition(info => {
        this.navigation.navigate('Map', 
        {
          name: holder1, 
          lat: info.coords.latitude,
          long: info.coords.longitude
        })
      })
      
    }
  
    render()
    {
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
                  source = { this.state.walkImage ? require('../assets/walk1.png') : require('../assets/walk2.png')}
                  style = {{width:160, height:160}}
                />
              </View>
              <TextInput
                style = { {height: 40, paddingHorizontal: 3, width: 120, borderColor: 'dimgray', borderWidth: 3, marginBottom: 10} }
                placeholder = "Keyword"
                onChangeText = {text => this.setState( {keyword: text.toLowerCase()} )}
                value = {this.state.keyword}
              />
              <TextInput
                style = { { height: 40, width: 120, paddingHorizontal: 3, borderColor: 'dimgray', borderWidth: 3} }
                placeholder = "Name"
                onChangeText = {text => this.setState( {name: text} )}
                value = {this.state.name}
              />
              <View 
              style = {{backgroundColor: "olive", borderTopWidth: 15, borderColor: "lemonchiffon"}}>
                <Button
                  title="Start Walk"
                  onPress={this.goingToVoice.bind(this)}
                  color = "black"
                />
              </View>
            </View>
            <View 
              style =
              {{flex:1, alignItems: 'center', justifyContent: 'flex-end', borderTopColor: "dimgrey", borderTopWidth: 2,
                borderBottomWidth: 70, borderBottomColor: "khaki", backgroundColor: "khaki",
                alignContent: 'stretch'}}>
              <View style = {{borderBottomWidth: 10, borderBottomColor: "khaki"}}>
                <Image
                  source = { this.state.walkImage ? require('../assets/binoculars1.png') : require('../assets/binoculars2.png')}
                  style = {{width:160, height:160}}
                />
              </View>
              <TextInput
                  style = { {height: 40, width: 120, paddingHorizontal: 3, borderColor: 'dimgray', borderWidth: 3} }
                  placeholder = "Name"
                  onChangeText = {text => { this.setState( {nameTwo: text} )} }
                  value = {this.state.nameTwo}
                />
              <View 
              style = {{backgroundColor: "olive", borderTopWidth: 15, borderColor: "khaki"}}>
                <Button
                style = {{borderTopWidth: 15}}
                title ="See Map"
                onPress ={this.goingToMap.bind(this)}
                color = "black"
              />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }