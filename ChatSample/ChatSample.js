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
      messages: 'Chat log Here',
    };

    this.loadMessage();
    this.render();
  }

  /*
    メッセージをDBに保存するメソッド
  */
  saveMessage = function(e){
    var message = this.state.messageInputValue;
    firebase.database().ref('messages').push({
      name: "testuser",
      text: message,
    }).then(() => {
      console.warn('Uploaded');
    }, e => {
      console.error(e);
    });
  }.bind(this);

  /*
    メッセージをDBから読み込むメソッド
  */
  loadMessage = function(){
    var messagesRef = firebase.database().ref('messages');
    var setMessage = function(data) {
      var val = data.val();
      //this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
      this.setState({messages: this.state.messages + "\n" + val.text});
      console.warn(val.text);
    }.bind(this);
    messagesRef.limitToLast(12).on('child_added', setMessage);
    messagesRef.limitToLast(12).on('child_changed', setMessage);
  }.bind(this);

  /*
    描画メソッド
  */
  render() {
    return(
      <View>
        <TextInput 
          onChangeText={(text)=>this.setState({messageInputValue: text})} />
        <Button
          title="Send"
          onPress={this.saveMessage} />
        <Text>
          {this.state.messages}
        </Text>
      </View>
    );
  }
}


