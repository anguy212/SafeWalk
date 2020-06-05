import React, {useEffect} from 'react';
import {
  AppRegistry,  
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/Home'
import VoiceNative from './component/Voice'
import MessageStart from './component/Message'
import DangerMap from './component/DangerMap'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        {/* <Stack.Screen name="Map" componenet={DangerMap}/> */}
        <Stack.Screen name="MessageStart" component={MessageStart}/>
        <Stack.Screen name="voiceListen" component={VoiceNative}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

AppRegistry.registerComponent('App', () => bProject);