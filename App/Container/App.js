import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { Provider } from 'react-redux'

import RootContainer from './RootContainer';
import configureStore from '../Redux/Store'

let initialState = {
  cats: [],
  user: {
    username: 'kev',
    id: 13
  }
}

let store = configureStore(initialState)


export default class App extends Component {

	componentDidMount(){
	}

	render() {
		return (
	      <View
	       style={{flex:1}}>
		      <Provider store={store}>
		        <RootContainer />
		      </Provider>
	      </View>
      	);
	}
}