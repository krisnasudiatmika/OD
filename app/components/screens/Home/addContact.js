import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

function AddContact({navigation}) {
  return (
    <SafeAreaView>
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button
        title="To Actions"
        onPress={() => {
          navigation.navigate('Invoice', {
            screen: 'Actions',
            params: {userId: 123},
          });
        }}
      />
    </SafeAreaView>
  );
}

export default AddContact;
