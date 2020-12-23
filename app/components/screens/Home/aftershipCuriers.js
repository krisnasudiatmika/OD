import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

function Couriers({navigation}) {
  const getCourier = () => {
    fetch('https://api.aftership.com/v4/couriers', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'aftership-api-key': 'a7935f83-1ed7-4c8e-8d44-2a17b767e9c1',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Button title="Get Courirer" onPress={getCourier} />
    </View>
  );
}

export default Couriers;
