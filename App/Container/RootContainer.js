/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Navigator,
  View
} from 'react-native';

import AppNavigation from './AppNavigation';


export default class RootContainer extends Component {
  constructor(props){
    super(props)
 
  }
 
  renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;

    if (routeId === 'home') {
      return (
        <Home
        {...this.props} 
        userData ={route.userData}
        navigator={navigator} />
        );
    }
    if (routeId === 'messages') {
      return (
        <Messages
        {...this.props} 
        userData ={route.userData}
        navigator={navigator} />
        );
    }
    if (routeId === 'profile') {
      return (
        <Profile
        {...this.props} 
        userData ={route.userData}
        navigator={navigator} />
        );
    }
  }


  render() {
    return (
      <View style={{flex:1}}>
        <AppNavigation />  
      </View>
    )
}
}
