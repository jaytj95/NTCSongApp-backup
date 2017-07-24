import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import * as firebase from 'firebase';

// firebase init
var firebaseConfig = {
    apiKey: "AIzaSyBARXYzxKrIY-BWTngNANwunVQS7nScDAI",
    authDomain: "ntcsongparse.firebaseapp.com",
    databaseURL: "https://ntcsongparse.firebaseio.com",
    projectId: "ntcsongparse",
    storageBucket: "ntcsongparse.appspot.com",
    messagingSenderId: "955827220203"
};
var fireRef = firebase.initializeApp(firebaseConfig);

export default class NTCSongApp extends Component {
    render() {
        return (
            <Text>Hello world!</Text>
        );
    }
}
