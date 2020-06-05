import React, {useEffect} from 'react';
import {
  Button, 
} from 'react-native';

export default function DangerMap({ navigation }) {
    const [location, setLocation] = React.useState('hello')
    return (
      <Button
        title="Done"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
    );
  }