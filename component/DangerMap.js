import React, {useEffect} from 'react';
import {
  Button, 
  View,
  Text,
} from 'react-native';

export default function DangerMap({ navigation }) {
    const [location, setLocation] = React.useState('hello')
    return (
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>
         Hello
       </Text>
     </View>
    );
  }