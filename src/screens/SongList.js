const {
    StyleSheet,
    ListView,
    View,
    TextInput,
    NetInfo,
    AsyncStorage,
} = ReactNative;

import ReactNative from 'react-native';
import * as firebase from 'firebase';
import React, {Component} from 'react';
const ListItem = require('../components/ListItem');

var RNFS = require('react-native-fs');
var cachePath = RNFS.DocumentDirectoryPath + '/songscache.txt';


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
            }),

        };
        this.itemsRef = this.getRef().child('song_list');
    }
    getRef() {
        return firebaseApp.database().ref();
    }
    componentDidMount() {
        this.listenForItems(this.itemsRef, "");
    }
    async listenForItems(itemsRef) {
        var items = [];
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                console.log("listening")
                itemsRef.on('value',  async (snap) => {
                    // get children as an array
                    snap.forEach((child) => {
                        let songText = child.child("SongText").val();
                        let title = child.child("SongNumber").val().toLowerCase() + ": " + child.child("SongTitle").val().toLowerCase() + songText.toLowerCase();
                        let display2 = replaceAll(child.child("SongText").val(), "\\[chorus:|\\[bold:", "");
                        items.push({
                            title: title,
                            SongTitle: child.child("SongTitle").val(),
                            SongNumber: child.child("SongNumber").val(),
                            SongText: songText,
                            DisplayText1: child.child("SongTitle").val(),
                            DisplayText2: display2,
                            _key: child.key
                        });
                    });

                    console.log("got " + items.length + " songs")

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                        originalSet: items,
                    });

                    let stringedItems = JSON.stringify(items)
                    RNFS.writeFile(cachePath, stringedItems, 'utf8')
                        .then((success) => {
                            console.log('FILE WRITTEN!');
                        })
                        .catch((err) => {
                            console.log(err.message);
                    });
                });
            } else {
                console.log("no internet?")
                //no internet or some error
                //reading
                RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                    .then((result) => {
                        // console.log('GOT RESULT', result);

                        // stat the first file
                        console.log(result[1].path)
                        return Promise.all([RNFS.stat(result[1].path), result[1].path]);
                    })
                    .then((statResult) => {
                        if (statResult[0].isFile()) {
                            // if we have a file, read it
                            return RNFS.readFile(statResult[1].trim(), 'utf8');
                        }

                        return 'no file';
                    })
                    .then((contents) => {
                        // log the file contents
                        console.log("Contents!!")
                        contents = JSON.parse(contents)
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(contents),
                            originalSet: contents,
                        });

                    })
                    .catch((err) => {
                        console.log(err.message, err.code);
                    });

            }
        });
    }

    _renderItem(item) {
        return (
            <ListItem item={item} onPress={() => this.props.navigation.navigate('SongView', item)}/>
        )
    }
    render() {
        let setSearchText = (text) => {
            console.log("searching for songs with [" + text + "]")
            let originalDataSet = this.state.originalSet;
            console.log("length of original " + originalDataSet.length)
            var items = [];
            if(text.length === 0) {
                console.log("empty string");
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(originalDataSet),
                });
            } else {
                // begin function
                console.log("begin search");
                for (let i = 0; i < originalDataSet.length; i++) {
                    let obj = originalDataSet[i];
                    console.log("checking if " + obj.title + "has " + text)
                    if (obj.title.indexOf(text.toLowerCase()) !== -1) {
                        items.push(obj)
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                });

            }
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.li}
                    value={this.state.searchText}
                    onChangeText={setSearchText}
                    placeholder='Search' />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>
            </View>
        );
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#000',
        fontSize: 18,
    },
    liTextBold: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    liTextSecondary: {
        color: '#828282',
        fontSize: 12,
    },
    liTextNum: {
        color: '#1866ff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    center: {
        textAlign: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    action: {
        backgroundColor: '#24CE84',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    songText: {
        color: '#232323',
        fontSize: 24,
        textAlign: 'left',
    },
    songTextChorus: {
        color: '#232323',
        fontSize: 24,
        textAlign: 'left',
        fontStyle: 'italic'
    },
})

module.exports = SongList