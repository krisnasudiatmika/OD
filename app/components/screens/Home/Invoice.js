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

function Invoice({navigation}) {
  const [dataInvoice, setDataInvoice] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [tenantID, setTenantID] = useState('');

  getInvoice = () => {
    fetch('https://api.xero.com/api.xro/2.0/Invoices/', {
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
        setDataInvoice(json.Invoices);
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
  const Separator = () => (
    <View
      style={{
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
      }}
    />
  );
  return (
    <SafeAreaView>
      <Button
        title="Add Invoice"
        onPress={() => {
          navigation.navigate('AddInvoice', {
            screen: 'Actions',
            params: {userId: 123},
          });
        }}
      />
      <Button title="Refresh Invoice" onPress={getInvoice} />
      <FlatList
        data={dataInvoice}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <View
            style={{marginBottom: 10, backgroundColor: '#ececec', padding: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('InvoiceDetails', {item})}>
              <Text style={{fontSize: 24}}>{item.InvoiceNumber}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Invoice;
