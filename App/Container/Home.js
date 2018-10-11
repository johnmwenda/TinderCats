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
  View,
  AsyncStorage
} from 'react-native';
import Nav from '../Components/global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../Redux/Actions'


class Home extends Component {
  constructor(props){
    super(props)

    this.props.actions.getCatsAsync(0)
  }


  Card(x){
    let status = ""
    if(x.hasOwnProperty('choice')) {
      if(x.choice == 1) {
        status = <Text style={{fontSize:15, fontWeight:'200', color:'#4CAF50'}}>Liked!</Text>
      }else {
        status = <Text style={{fontSize:15, fontWeight:'200', color:'#444'}}>Nope</Text>
      }
    }else {
      status = <Text style={{fontSize:15, fontWeight:'200', color:'#444'}}></Text>
    }
    return (
      <View style={styles.card}>
        <Image source ={{uri: x.url}} resizeMode="contain" style ={{width:350, height:350}} />
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
        <Text style={{fontSize:15, fontWeight:'300', color:'#444'}}>{x.id}, </Text>
        { status }
        </View>
        <View style={{flexDirection:'row'}}>
        </View>
        </View>
      </View>
    )
  }

  handleYup (card) {
    
    AsyncStorage.getItem('likes_dislikes').then(
      (values) => {
        if(values != null) {
          results = JSON.parse(values)
          results[card.id] = 1
          
          var setInStorage = AsyncStorage.setItem('likes_dislikes', JSON.stringify(results) ).then(
              (value) => {});

        }else {
          results = {};
          results[card.id] = 1;

          var setInStorage = AsyncStorage.setItem('likes_dislikes', JSON.stringify(results) ).then(
              (value) => {}, (error)=>{});

        }
      }).catch((error)=>{console.log(error)});
  }

  handleNope (card) {
    AsyncStorage.getItem('likes_dislikes').then(
      (values) => {
        if(values != null) {
          results = JSON.parse(values)
          results[card.id] = 0
          
          var setInStorage = AsyncStorage.setItem('likes_dislikes', JSON.stringify(results) ).then(
              (value) => {});

        }else {
          results = {};
          results[card.id] = 0;

          var setInStorage = AsyncStorage.setItem('likes_dislikes', JSON.stringify(results) ).then(
              (value) => {console.log(value)}, (error)=>{console.log(error) });
        }
      }).catch((error)=>{console.log(error)});
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
         <TouchableOpacity onPress={()=>this.goBackHome()}>
          <Text>Reload!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={RoundedButtonStyles.button} onPress={()=>this.goBackHome()}>
          <Text style={RoundedButtonStyles.buttonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    )
  }

  goBackHome() {
    this.props.navigation.navigate('Home');
  }

  yup(){
      // console.log(this.refs['swiper'])
    this.refs['swiper']._goToNextCard()
  }

  nope(){
      // console.log(this.refs['swiper'])
    this.refs['swiper']._goToNextCard()  
  }

  render() {
    return (
      <View style={styles.container}>
           <Nav chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />
      <SwipeCards
        ref = {'swiper'}
        cards={this.props.cats}
        containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
        renderCard={(cardData) => this.Card(cardData)}
        renderNoMoreCards={() => this.noMore()}
        handleYup={this.handleYup}
        handleNope={this.handleNope} />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
        <Text>Nope!</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonSmall}>
          <Text>asd!</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
        <Text>Yay!</Text>
        </TouchableOpacity>

        </View>
        </View>
    )
}
}
//onPress = {() => this.renderNope()} 

const RoundedButtonStyles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: '#e73536',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 10,
    paddingRight: 10,
    paddingLeft: 10
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50, 
    height:50, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }
 
});


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
