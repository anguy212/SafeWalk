import React, {useEffect} from 'react';
import {
  Button, 
  View, 
  Text, 
  StyleSheet,
} from 'react-native';
import Voice from 'react-native-voice';
import Geolocation from '@react-native-community/geolocation';

export default class VoiceNative extends React.Component 
{
  constructor({props, route, navigation}) 
  {
    super(props);
    this.state = {
      recognized: '',
      results: [],
      emergency: true,
      key: route.params
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    this.navigation = navigation
  }

  render () 
  {
      return (
        <View>
          <View>
            <Button 
              title = "Go to Tracking"
              onPress = {this.goToTracking.bind(this)}
            >
            </Button>
            <Text style={styles.transcript}>
                Results
            </Text>
            {this.state.results.map((result) => 
            <Text style={styles.transcript}> 
            {result}
            </Text>)}
            <Text style={styles.transcript}>
                Keyowrd
            </Text>
            <Text style={styles.transcript}> 
            {this.state.key.key}
            </Text>
          </View>
        </View>
      );
  }

  componentDidMount()
  {
    try {
      this._startRecognition()
    } 
    catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount()
  {
    try {
      this._stopRecognition()
    } catch (error) {
      console.log(error)
    }
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) 
  {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized(e) 
  {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechResults(e) 
  {
    this.setState({
      results: e.value,
    });
    r = this.state.results[0]
    words = r.split(" ")
    len = words.length
    lastWord = words[len-1]
    if(lastWord.toLowerCase() === this.state.key.key)
    {
      this.goToTracking()

    } 
  }

  goToTracking()
  {
    try {
      this._stopRecognition
    } catch (error) {
      console.log(error)
    }
    Voice.destroy().then(Voice.removeAllListeners);
    Geolocation.getCurrentPosition(info => {
      this.navigation.navigate('MessageStart', 
      {
        uid: this.state.key.uid, 
        name: this.state.key.name, 
        lat: info.coords.latitude,
        long: info.coords.longitude
      })
    })
  }

  async _startRecognition(e) 
  {
    this.setState({
      recognized: '',
      started: '',
      results: []
    });
    try 
    {
      await Voice.start('en-US');
    } 
    catch (e) 
    {
      console.error(e);
    }
  }

  async _stopRecognition(e)
  { 
    try 
    {
      await Voice.stop();
    } 
    catch (e) 
    {
      console.error(e);
    }
  }
}

const styles = StyleSheet.create({
    transcript: 
    {
      textAlign: 'center',
      color: '#B0171F',
      marginBottom: 1,
      marginTop: 30,
    },
  });