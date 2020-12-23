import {Navigation} from 'react-native-navigation';
import Home from '../components/screens/Home';

export default function registerScreens() {
  Navigation.registerComponent('Home', () => Home);
}
