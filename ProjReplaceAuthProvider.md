# ProjReplaceAuthProvider.md
GoogleAuthProviderからFirebaseAuthに置き換えるプロジェクト(仮)

#### 概要
[このページ](https://qiita.com/st5757/items/9e651e8cffaa90681426)のFriendlyChatのログイン部分の実装方法は下記のとおりである。
OAuthベースの認証ならsignInWithPopupで簡単だが、これをFirebase SDKで置き換えたい。

```
FriendlyChat.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};
```

#### 結論
[このページ](https://firebase.google.com/docs/auth/web/start?hl=ja)の通りに進めれば良さそう。
ただし、ダイアログとか作ってないのでメール/パスワードがマジックナンバーになってます。

###### 1.とりあえず適当に新規登録ボタンを作る。
index.htmlの55行目 Header Section当たりにでも追加したらよさげ。

```
<button id="sign-up" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
  Sign-up
</button>
```

###### 2.バインドしましょう。
main.jsに戻って、リスナーとショートカットをそれぞれ追加。

```
this.signUpButton = document.getElementById('sign-up');
```

```
this.signUpButton.addEventListener('click', this.signUp.bind(this));
```

```
FriendlyChat.prototype.signUp = function() {
  // TODO
};
```

##### 3.新規登録の処理を書きます。
ガイドの通りに、さっき作ったsignUp関数を書き換えます。

```
FriendlyChat.prototype.signUp = function() {
  var email = "bbb@gmail.com";
  var password = "adminadmin";
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
};
```

##### 4.ログインの処理を置き換えます。
signIn関数をGoogleAuthProviderからEmail/Password形式に変えます。

```
FriendlyChat.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  //var provider = new firebase.auth.GoogleAuthProvider();
  //this.auth.signInWithPopup(provider);
  var email = "bbb@gmail.com";
  var password = "adminadmin";
  this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
   } );
};
```


#### 用語集

##### firebase.auth.GoogleAuthProvider : firebase.auth.AuthProvider
こいつは、Googleアカウントによるログインを提供するクラス。
https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider

##### this.auth : firebase.auth
https://firebase.google.com/docs/reference/js/firebase.auth

