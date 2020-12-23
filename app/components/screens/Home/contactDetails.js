import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, AsyncStorage, Text} from 'react-native';

function ContactDetails({route, navigation}) {
  const [contactID, setContactID] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [tenantID, setTenantID] = useState('');
  const [dataInvoice, setDataInvoice] = useState();

  useEffect(() => {
    const {item} = route.params;
    setContactID(item.ContactID);

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
  const getContactParam = () => {
    console.log(contactID);
    fetch('https://api.xero.com/api.xro/2.0/Contacts/' + contactID, {
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
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView>
      <Button title="Check" onPress={getContactParam} />
      <Text>{contactID}</Text>
    </SafeAreaView>
  );
}

export default ContactDetails;
