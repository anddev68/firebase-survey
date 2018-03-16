# ChatSample
RNFirebaseをreact-nativeで実装したもの

#### 1.依存関係の設定(Android)
###### app/build.gradleに使用するモジュールを追加する。
```
    // Firebase dependencies
    compile "com.google.android.gms:play-services-base:11.8.0"
    compile "com.google.firebase:firebase-core:11.8.0"

    // for RNFirebase
    compile "com.google.firebase:firebase-auth:11.8.0"
    compile "com.google.firebase:firebase-storage:11.8.0"
    compile "com.google.firebase:firebase-database:11.8.0"
```

###### MainApplication.javaに、使用するパッケージを追加する。
```
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

　// (省略)

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseStoragePackage()
      );
    }
```
#### 2.JS側の実装
要点だけ。Firebase上に作成したアカウントでログインします。
```
this.auth = firebase.auth();
this.signIn("ccc@gmail.com", "adminadmin");
```

```
signIn = function(email, password){
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage);
    });
}.bind(this);
```

ログインステータスが変化したときのリスナー。ここで、メッセージをロードする。
```
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
 ```   
 
メッセージをロードするためのメソッドは次の通り。
uidをキーにして、1対1チャットにアクセスする。
1メッセージずつこのメソッドが呼ばれます。（すべてのメッセージを一度に取得するわけではない）
```
  loadMessage = function(){
    var uid = this.state.user.uid;
    //  ファイル名[uid].jsonからメッセージを取得する
    var messagesRef = this.database.ref(uid);
    var setMessage = function(data) {
      var val = data.val();
      this.setState({messages: this.state.messages + "\n" + val.text});
      console.warn(val.text);
    }.bind(this);
    messagesRef.limitToLast(12).on('child_added', setMessage);
    messagesRef.limitToLast(12).on('child_changed', setMessage);
  }.bind(this);
 ```
 
 メッセージを保存するメソッドです。load同様にuidをキーにします。
 pushするとsetMessageが呼ばれるので自動で更新される。
 ```
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
```
 
 
#### 注意点
下記設定では、uidが漏れると他のチャットログにアクセスできてしまうので注意。
```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

