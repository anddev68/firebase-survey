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

###### とりあえず適当に新規登録ボタンを作る。
```
<button hidden id="sign-up" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
  Sign-up
</button>
```


##### firebase.auth.GoogleAuthProvider : firebase.auth.AuthProvider
こいつは、Googleアカウントによるログインを提供するクラス。
https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider

##### this.auth : firebase.auth
https://firebase.google.com/docs/reference/js/firebase.auth

