import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

function Contact({navigation}) {
  const [dataContacts, setDataContact] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [tenantID, setTenantID] = useState('');

  getContacts = () => {
    fetch('https://api.xero.com/api.xro/2.0/Contacts/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer ' + accessToken,
        'xero-tenant-id': tenantID,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setDataContact(json.Contacts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('access_token', (error, result) => {
      if (result) {
        setAccessToken(result);
      }
    });

    AsyncStorage.getItem('tenant_ID', (error, result) => {
      if (result) {
        setTenantID(result);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button title="Add Contact" />
      <Button title="Get Contacts" onPress={this.getContacts} />
      <FlatList
        style={{marginTop: 40}}
        data={dataContacts}
        renderItem={({item}) => (
          <View
            style={{marginBottom: 10, backgroundColor: '#ececec', padding: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactDetails', {item})}>
              <Text style={{fontSize: 24}}>{item.Name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default Contact;
