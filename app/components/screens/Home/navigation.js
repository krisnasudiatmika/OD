import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './Home';
import Invoice from './Invoice';
import Contact from './Contact';
import AddInvoice from './addInvoice';
import InvoiceDetails from './InvoiceDetails';
import ContactDetails from './contactDetails';
import Couriers from './aftershipCuriers';
import Link from './Link';
import {
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ContactsStack = createStackNavigator();
const ContactsStackScreen = () => (
  <ContactsStack.Navigator>
    <ContactsStack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: 'Add Data Invoice',
      }}
    />
    <ContactsStack.Screen
      name="AddInvoice"
      component={AddInvoice}
      options={{
        headerTitle: 'Add Data Invoice',
      }}
    />
    <ContactsStack.Screen
      name="InvoiceDetails"
      component={InvoiceDetails}
      options={{
        headerTitle: 'Detail Invoice Number',
      }}
    />
    <ContactsStack.Screen
      name="ContactDetails"
      component={ContactDetails}
      options={{
        headerTitle: 'Detail Contact Number',
      }}
    />
  </ContactsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Contacts"
      component={ContactsStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Text name="ios-contacts" size={props.size} color={props.color} />
        ),
      }}
    />
  </AppTabs.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen name="Home" component={AppTabsScreen} />
    <AppDrawer.Screen name="Invoice" component={Invoice} />
    <AppDrawer.Screen name="Contact" component={Contact} />
    <AppDrawer.Screen name="Aftership" component={Couriers} />
    <AppDrawer.Screen name="Settings" component={Link} />
  </AppDrawer.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppDrawerScreen />
  </NavigationContainer>
);
