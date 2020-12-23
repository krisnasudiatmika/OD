import React, {useState, useEffect, PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Linking,
  AsyncStorage,
} from 'react-native';

import qs from 'qs';

class Link extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDeepLink = this.handleDeepLink.bind(this);
  }

  state = {
    url: 'https://login.xero.com/identity/connect/authorize',
    response_type: 'code',
    code_challenge_method: 'S256',
    client_id: '58C15BD5F1A9440E9311751FC71CF46F',
    scope:
      'openid profile email accounting.transactions offline_access accounting.contacts',
    redirect_uri: 'http://localhost:5000/oauth2proxy/',
    state: '123',
    code_challenge: '6FLKrVuyUWfg2O4s-wfP05L65yMwu5ODuYzRyTuz1yI',
    code: 'qwe',
    access_token: '',
    tenant_ID: '',
    dataset: '',
  };

  connectToken = () => {
    fetch('https://identity.xero.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: qs.stringify({
        grant_type: 'authorization_code',
        client_id: '58C15BD5F1A9440E9311751FC71CF46F',
        code: this.state.code,
        redirect_uri: this.state.redirect_uri,
        code_verifier:
          'thisismycode123thisismycode123thisismycode123thisismycode123',
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        const tokenId = responseData.access_token;
        this.setState({access_token: tokenId});
        AsyncStorage.setItem('access_token', tokenId);

        console.log('Access Token: ' + tokenId);
        this.checkConnection();
      });
  };

  checkConnection = () => {
    fetch('https://api.xero.com/connections', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.state.access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Tenant ID : ' + json[0].tenantId);
        this.setState({tenant_ID: json[0].tenantId});
        AsyncStorage.setItem('tenant_ID', json[0].tenantId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    Linking.addEventListener('url', this.handleDeepLink);
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  handleDeepLink(e) {
    const route = e.url.replace(/.*?:\/\//g, '');
    this.setState({code: route});
    this.connectToken();
  }

  openBrowser = () => {
    const {
      url,
      response_type,
      code_challenge_method,
      client_id,
      scope,
      redirect_uri,
      state,
      code_challenge,
    } = this.state;

    const params = {
      response_type,
      code_challenge_method,
      client_id,
      scope,
      redirect_uri,
      state,
      code_challenge,
    };

    const authorizationUrl = url + '?' + qs.stringify(params);

    Promise.all([
      AsyncStorage.setItem('code_verifier', 'test' || ''),
      AsyncStorage.setItem('state', 'hello'),
    ])
      .then(() => {
        Linking.openURL(authorizationUrl);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  render() {
    return (
      <View>
        {this.state.access_token !== '' ? (
          <View>
            <Text>Now You Are Connected</Text>
          </View>
        ) : (
          <View>
            <Button title="Connect To App" onPress={this.openBrowser} />
          </View>
        )}
      </View>
    );
  }
}

export default Link;
