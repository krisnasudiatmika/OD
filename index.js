import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import registerScreens from './app/nav/index';
import {Navigation} from 'react-native-navigation';

AppRegistry.registerComponent(appName, () => App);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
