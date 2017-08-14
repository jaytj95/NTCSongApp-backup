const {
    ListView,
    AppRegistry,
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
} = ReactNative;
import {
    StackNavigator,
} from 'react-navigation';

import ReactNative from 'react-native';
import * as firebase from 'firebase';
import React, {Component} from 'react';
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');
const reactStringReplace = require('react-string-replace')

import HTMLView from 'react-native-htmlview';

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

// remove debugging annoyance
console.ignoredYellowBox = ['Setting a timer'];

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
        this.listenForItems(this.itemsRef, "");
    }
    listenForItems(itemsRef, text) {
            itemsRef.on('value', (snap) => {
                var items = [];
                // get children as an array
                snap.forEach((child) => {
                    var songText = child.child("SongText").val();
                    var title = child.child("SongNumber").val().toLowerCase() + ": " + child.child("SongTitle").val().toLowerCase() + songText.toLowerCase();

                    // if title of song contains filter text
                    if (title.indexOf(text.toLowerCase()) !== -1) {
                        items.push({
                            title: title,
                            SongTitle: child.child("SongTitle").val(),
                            SongNumber: child.child("SongNumber").val(),
                            SongText: songText,
                            _key: child.key
                        });
                    }
                });

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items)
                });

            });
    }

    _renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <ListItem item={item} onPress={() => navigate('SongView', item)}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.li}
                    value={this.state.searchText}
                    onChangeText={this.setSearchText.bind(this)}
                    placeholder='Search' />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>
            </View>
        );
    }

    setSearchText(text) {
        this.listenForItems(this.itemsRef, text);
    }
}


class SongView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.SongTitle}`,
    });

    render() {
        const { params } = this.props.navigation.state;
        var renderString = `<p>${params.SongText}</p>`;
        renderString = replaceAll(renderString, "\\[chorus:", '<span>');
        renderString = replaceAll(renderString, "]", '</span>');

        return (
            <ScrollView>
                <HTMLView
                    value={renderString}
                    stylesheet={htmlStyles}
                />
            </ScrollView>
        );
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const htmlStyles = StyleSheet.create({
    p: {
        fontSize: 20,
        fontWeight: '300',
        color: '#000000',
    },
    span: {
        fontStyle: 'italic'
    }

});


const NTCSongApp = StackNavigator({
    Home: { screen: SongList },
    SongView: { screen: SongView },
});

AppRegistry.registerComponent('NTCSongApp', () => NTCSongApp);