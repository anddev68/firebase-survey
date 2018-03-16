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
      user: null,
    };

    this.database = firebase.database();
    this.auth = firebase.auth();

    //  面倒なのでオートログインにした
    //  bbb/cccでアカウント切り替えてみて
    this.signOut();
    //this.signIn("bbb@gmail.com", "adminadmin");
    this.signIn("ccc@gmail.com", "adminadmin");

    //  ステータスがへんかしたときのハンドル
    this.auth.onAuthStateChanged((user)=>{
      if (user) {
        this.setState({user: user});
        //  メッセージをロードする
        this.loadMessage();
      } else {
        // No user is signed in.
      }
    });
  }

  /*
    signメソッド
  */
  signIn = function(email, password){
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage);
    });
  }.bind(this);


  /*
    signoutメソッド
  */
  signOut = function(){
    this.auth.signOut();
  }.bind(this);


  /*
    メッセージをDBに保存するメソッド
  */
  saveMessage = function(e){
    var message = this.state.messageInputValue;
    var name = this.state.user.email;
    var uid = this.state.user.uid;
    this.database.ref(uid).push({
      name: name,
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
    var uid = this.state.user.uid;
    //  ファイル名[uid].jsonからメッセージを取得する
    var messagesRef = this.database.ref(uid);
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
  render = function(){
    if(!this.state.user) return null;

    return(
      <View>
        <Text>
          {this.state.user.uid + " " +this.state.user.email}
        </Text>
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
  }.bind(this);
}
