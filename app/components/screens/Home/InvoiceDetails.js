import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, AsyncStorage, Text} from 'react-native';

function InvoiceDetails({route, navigation}) {
  const [invoiceID, setInvoiceID] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [tenantID, setTenantID] = useState('');
  const [dataInvoice, setDataInvoice] = useState();

  useEffect(() => {
    const {item} = route.params;
    setInvoiceID(item.InvoiceID);

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
  const getInvoiceParam = () => {
    fetch('https://api.xero.com/api.xro/2.0/Invoices/' + invoiceID, {
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
        setDataInvoice(json);
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView>
      <Button title="Check" onPress={getInvoiceParam} />
    </SafeAreaView>
  );
}

export default InvoiceDetails;
