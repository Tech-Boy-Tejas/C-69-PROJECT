import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import ScanScreen from './screens/scanScreen';

export default class App extends React.Component{
  render(){
    return (
      <AppContainer/>
    );
  }
}

const TabNavigator = createSwitchNavigator({
  ScanScreen:ScanScreen,
})

const AppContainer = createAppContainer(TabNavigator);

