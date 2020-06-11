import React, {useEffect} from 'react';   
import {
  Button, 
  View,
  Text,
  Image
} from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

export default class DangerMap extends React.Component {
    constructor({navigation, route, props})
    {
      super(props)
      this.state =
      {
        key: route.params, //name, lat, long
        latitude: 0,
        longitude: 0,
        marks: [], 
        uid: "", 
        dBool: false,
        distance: 0,
      }

      this.navigation = navigation
      this.SelectedPerson = this.SelectedPerson.bind(this)

    }

    LocationAcquire = () =>
    {
      // console.log("location acquire")
      Geolocation.getCurrentPosition(info =>
      {
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        })
      })

      database().ref('/users/').once('value')
      .then(snapshot =>
      {
        if(snapshot != null)
        {
          holder = []

          snapshot.forEach(ChildSnap =>
          {
            // console.log(ChildSnap.key)
            hold = {latitude: ChildSnap.val().userInfo.coordinates.latitude, 
            longitude: ChildSnap.val().userInfo.coordinates.longitude, 
            name: ChildSnap.val().userInfo.name, 
            uid: ChildSnap.key}
            holder.push(hold)
          })

          this.setState({
            marks: [...holder]
          })
          // console.log(this.state.marks)
        }
      })
    }

    componentDidMount(){
      Geolocation.getCurrentPosition(info =>
      {
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        })
      })

      this.LocationAcquire()

      this.interval = setInterval(this.LocationAcquire, 6000)
    }

    componentWillUnmount(){
      database()
        .ref('/users/' + this.state.uid + '/assignees/' + this.state.key.name + '/' )
        .set(null)
      clearInterval(this.interval)
    }

    goHome()
    {
      this.navigation.navigate('Home')
    }

    SelectedPerson()
    {
      Geolocation.getCurrentPosition(info =>
        {
          this.setState({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
          })
        })

        database()
        .ref('/users/' + this.state.uid + '/assignees/' + this.state.key.name + '/')
        .set(
          {
            latitude: this.state.latitude, longitude: this.state.longitude
          }
        )

        database().ref('/users/' + this.state.uid + '/').once('value')
        .then(snapshot =>
        {
          if(snapshot != null)
          {
            holder = []

            hold = {latitude: snapshot.val().userInfo.coordinates.latitude, 
            longitude: snapshot.val().userInfo.coordinates.longitude, 
            name: snapshot.val().userInfo.name, 
            uid: snapshot.key}

            holder.push(hold)

            this.setState({
              marks: [...holder]
            })
          }
        })
        
        // const d = Math.sqrt(Math.pow((this.state.marks[0].latitude - this.state.latitude), 2) + 
        // Math.pow((this.state.marks[0].longitude - this.state.longitude), 2))

        const R = 6371e3; // metres
        const φ1 = this.state.marks[0].latitude * Math.PI/180; // φ, λ in radians
        const φ2 = this.state.latitude * Math.PI/180;
        const Δφ = (this.state.marks[0].latitude - this.state.latitude) * Math.PI/180;
        const Δλ = (this.state.marks[0].longitude - this.state.longitude) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        this.setState({
          distance: d.toFixed()
        })

        if(d === 0)
        {
          clearInterval(this.interval)
        }
    }

    setHelper(userId)
    {
      this.setState({
        uid: userId,
        dBool: true
      })
      
      clearInterval(this.interval)

      this.SelectedPerson()

      this.interval = setInterval(this.SelectedPerson, 6000)
    }

    render () {
      return (
        <View
        style={{ flex: 1, alignItems: 'stretch', flexDirection: 'column', borderWidth: 25, borderColor: 'ivory',
        borderTopWidth: 50, borderBottomWidth: 30}}>
          <View 
          style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around', flexDirection: 'column', borderWidth: 2, borderColor: 'dimgray',
          borderTopWidth: 2, borderBottomWidth: 2}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                title = "Go Back"
                onPress = {this.goHome.bind(this)}
                style = {{borderBottomWidth: 20}}
              />
              {this.state.dBool ? 
                <Text>  Distance From Person: {this.state.distance} meters </Text> :
                <Text> Select Person To Assist </Text>}
            </View>
            <MapView
            style = {{flex:3}}
            initialRegion =
            {{
              latitude: this.state.key.lat,
              longitude: this.state.key.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
              <Marker 
                coordinate = {{latitude: this.state.latitude, longitude: this.state.longitude}}
                title = {this.state.key.name} >
                  <View style={{padding: 5}}>
                    <Image
                      style = {{width: 40, height: 40}}
                      source = {require('../assets/bICON.png')}
                    />
                  </View>
              </Marker>
              {this.state.marks.map(mark => (
                <Marker 
                  coordinate = {{latitude: mark.latitude, longitude: mark.longitude}}>
                    <View style={{padding: 5}}>
                      <Image
                        style = {{width: 40, height: 40}}
                        source = {require('../assets/hICON.png')}
                      />
                    </View>
                    <Callout
                      onPress = {this.setHelper.bind(this, mark.uid)} >
                      <View style = {{alignContent: 'center', justifyContent: 'center', width: 40, height: 40}}>
                        <Text style = {{textAlign: 'center', fontSize: 16, numberOfLines: 2, flexWrap: 'wrap'}}>
                          Track {mark.name} 
                        </Text>
                      </View>
                    </Callout>
                 </Marker>
              ))}
            </MapView>
          </View>
        </View>
      );
    }
  }