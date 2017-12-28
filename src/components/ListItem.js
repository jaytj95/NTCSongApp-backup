import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('./styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text>
                        <Text style={styles.liTextNum}>{this.props.item.SongNumber}:</Text>
                        <Text style={styles.liText}> {this.props.item.DisplayText1}</Text>
                    </Text>
                    <Text numberOfLines={1} style={styles.liTextSecondary}>{this.props.item.DisplayText2}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;