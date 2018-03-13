# ProjFrendlyChatOnRNFirebase
[Frendly Chat](https://qiita.com/st5757/items/9e651e8cffaa90681426)をRNFirebaseで移植する計画

#### 結論

* Auth
* Database
* Stroage

こいつらをApp.jsで使えるようにすればOK。

#### 0.事前準備
RNFirebaseが導入されていること。
Firebase上にEmail/passwordログインを設定しておくこと。

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

#### 2.リアルタイムデータベースへの接続


