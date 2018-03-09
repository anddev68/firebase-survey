# ProjReactFirebase
FirebaseとReactの連結調査

#### 諸注意
Windows環境で行いました。

#### Easy Install
##### 1.必要なものをインストール
* npm & node [このへん](https://qiita.com/taiponrock/items/9001ae194571feb63a5e)からインストール。
* Android SDKのインストールを行う。
* Android SDKのパスを通す。
* react-nativeのインストール。
```
npm install react-native-cli -g
```

##### 2.プロジェクト作成&実行
[このページ](https://qiita.com/YutamaKotaro/items/dd7846c6db15e2307daa)を参考に、プロジェクトを作成する。

```
react-native init sample
```

先にAndroidエミュレータを立ち上げておき、実行する。
```
react-native run-android
```

Android上にHello World的なページが表示されたらOK。

##### 3. ReactNativeFirebase(RNFirebase)の導入
基本的に[ここ](https://rnfirebase.io/docs/v3.3.x/installation/initial-setup)の通りにやる。以下、抜粋。

1. Firebaseプロジェクトは作成済みである。（なければ作る）
2. Firebaseコンソールからアプリを追加ボタンを押し、google-services.jsonを手に入れる。
3. google-services.jsonをApp配下に置く。
4. 2種類のgradleを書き換える。(プロジェクト配下とapp配下を間違えないように注意）
