/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';

// for Login
import firebase from 'react-native-firebase';


export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      messageInputValue: '',
    };
  }

  /*
    メッセージをDBに保存するメソッド
  */
  saveMessage = function(e){
    var message = this.state.messageInputValue;
    firebase.database().ref('messages').push({
      name: "testuser",
      text: message,
    }).then(function() {
      console.warn("Uploaded!");
      //  ばいんどいらない
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }.bind(this);

  render() {
    return(
      <View>

        <TextInput 
          onChangeText={(text)=>this.setState({messageInputValue: text})} />
        <Button
          title="Send"
          onPress={this.saveMessage} />

      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

