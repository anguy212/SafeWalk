import React, {useEffect} from 'react';
import {
  Button, 
  View, 
  Text, 
  Image 
} from 'react-native';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';

export default class MessageStart extends React.Component {
    constructor({props, route, navigation}) 
    {
      super(props);
      this.state = {
        latitude: 0,
        longitude: 0,
        marks: [],
        interval: 0,
        key: route.params //name, uid, lat, long
      };
      this.navigation = navigation
    }
  
    setLocation = () => {
      Geolocation.getCurrentPosition(info => 
        {
          Geolocation.getCurrentPosition(info => 
          {
            this.setState(
              {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
              }
            )
          })
          database()
          .ref('/users/' + this.state.key.uid + '/userInfo/')
          .set({
            name: this.state.key.name,
            coordinates: {longitude: info.coords.longitude, latitude: info.coords.latitude}
          })
          .then(() => console.log('Data set.'));
        })
        database()
        .ref('/users/' + this.state.key.uid + '/assignees/')
        .once('value')
        .then(snapshot => {
          if(snapshot != null)
          {
            holder = []
            snapshot.forEach(ChildSnap =>
            {
              holder.push(ChildSnap.val())
            })
            this.setState(
              {
                marks: [...holder]
              }
            )
          }
        });
    }

    componentDidMount()
    {
      console.log("constructor") 
      Geolocation.getCurrentPosition(info => 
        {
          this.setState(
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude
            }
          )
        })
      this.setLocation()
      this.interval = setInterval(this.setLocation, 6000)
    }
  
    componentWillUnmount()
    {
      clearInterval(this.interval)
    }
  
    async goToHome()
    {
      await database().ref('/users/' + this.state.key.uid + '/').remove()
      this.navigation.navigate('Home')
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
          <View style={{flex: 1}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Details Screen</Text>
              <Text> Name {this.state.key.name} </Text>
              <Text> UID {this.state.key.uid} </Text>
              <Text> Longitude {this.state.longitude} </Text>
              <Text> Latitude {this.state.latitude} </Text>
              <Button
              title = "I am safe"
              onPress = {this.goToHome.bind(this)}/>
            </View>
            <MapView
            style={{flex: 3}}
            initialRegion=
              {{
                latitude: this.state.key.lat,
                longitude: this.state.key.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
                <Marker 
                coordinate = {{latitude: this.state.latitude, longitude: this.state.longitude}}
                title = {this.state.key.name}>
                    <View style={{padding: 5}}>
                      <Image
                        style = {{width: 40, height: 40}}
                        source = {require('../assets/hICON.png')}
                      />
                    </View>
                </Marker>
                {this.state.marks.map(mark =>
                  (
                    <Marker 
                      coordinate = {{latitude: mark.latitude, longitude: mark.longitude}}
                      title = "Help">
                      <View style={{padding: 5}}>
                        <Image
                          style = {{width: 40, height: 40}}
                          source = {require('../assets/bICON.png')}
                        />
                      </View>
                    </Marker>
                  ))}
            </MapView>
          </View>
        </View>
      </View>
      )
    }
  }