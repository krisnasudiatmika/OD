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
import qs from 'qs';

function AddInvoice({navigation}) {
  const [allValue, setAllValue] = useState({
    contactID: '',
    description: '',
    unitamount: '',
    discount: '',
  });
  const [accessToken, setAccessToken] = useState('');
  const [tenantID, setTenantID] = useState('');
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
  const uploadInvoice = () => {
    fetch('https://api.xero.com/api.xro/2.0/Invoices/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer ' + accessToken,
        'xero-tenant-id': tenantID,
      },
      body: JSON.stringify({
        Type: 'ACCREC',
        Contact: {
          ContactID: allValue.contactID,
        },
        Date: '/Date(1518685950940+0000)/',
        DueDate: '/Date(1518685950940+0000)/',
        DateString: '2009-05-27T00:00:00',
        DueDateString: '2009-06-06T00:00:00',
        LineAmountTypes: 'Exclusive',
        LineItems: [
          {
            Description: allValue.description,
            Quantity: '10',
            UnitAmount: allValue.unitamount,
            AccountCode: '200',
            DiscountRate: allValue.discount,
          },
        ],
      }),
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
      <Text>Client ID</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Client ID"
        onChangeText={(e) => {
          const val = e;
          setAllValue((prevState) => {
            return {...prevState, contactID: val};
          });
        }}
        defaultValue={allValue.contactID}
      />
      <Text>Description</Text>
      <TextInput
        style={{height: 40}}
        placeholder="description"
        onChangeText={(e) => {
          const val = e;
          setAllValue((prevState) => {
            return {...prevState, description: val};
          });
        }}
        defaultValue={allValue.description}
      />
      <Text>Unit Amount</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Unit Amount"
        onChangeText={(e) => {
          const val = e;
          setAllValue((prevState) => {
            return {...prevState, unitamount: val};
          });
        }}
        defaultValue={allValue.unitamount}
      />
      <Text>Discount</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Discount"
        onChangeText={(e) => {
          const val = e;
          setAllValue((prevState) => {
            return {...prevState, discount: val};
          });
        }}
        defaultValue={allValue.discount}
      />
      <Button title="Test Upload" onPress={uploadInvoice} />
    </SafeAreaView>
  );
}

export default AddInvoice;
