const {
    ListView,
    AppRegistry,
    View,
    Text,
} = ReactNative;
import {
    StackNavigator,
} from 'react-navigation';

import ReactNative from 'react-native';
import * as firebase from 'firebase';
import React, {Component} from 'react';
const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

// firebase init
var firebaseConfig = {
    apiKey: "AIzaSyBARXYzxKrIY-BWTngNANwunVQS7nScDAI",
    authDomain: "ntcsongparse.firebaseapp.com",
    databaseURL: "https://ntcsongparse.firebaseio.com",
    projectId: "ntcsongparse",
    storageBucket: "ntcsongparse.appspot.com",
    messagingSenderId: "955827220203"
};
var firebaseApp = firebase.initializeApp(firebaseConfig);

export default class SongList extends React.Component {

    static navigationOptions = {
        title: 'NTC Songs',
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('song_list');
    }
    getRef() {
        return firebaseApp.database().ref();
    }
    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.child("SongNumber").val() + ": " + child.child("SongTitle").val(),
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    _renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <ListItem item={item} onPress={() => navigate('Chat', { item })}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>

            </View>
        );
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with ${navigation.state.params.item.SongTitle}',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Yo{params.item.SongTitle}</Text>
            </View>
        );
    }
}

const NTCSongApp = StackNavigator({
    Home: { screen: SongList },
    Chat: { screen: ChatScreen },

});

AppRegistry.registerComponent('NTCSongApp', () => NTCSongApp);
