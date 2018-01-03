import {ScrollView, StyleSheet} from 'react-native'
import React, {Component} from 'react';

import HTMLView from 'react-native-htmlview';

export default class SongView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.SongTitle}`,
    });

    render() {
        const { params } = this.props.navigation.state;
        var renderString = `<p>${params.SongText}</p>`;
        renderString = replaceAll(renderString, "\\[chorus:", '<chorus>');
        renderString = replaceAll(renderString, "\\[bold:", '<bold>');
        renderString = replaceAll(renderString, "]", '</bold></chorus>');

        return (
            <ScrollView>
                <HTMLView
                    style={{padding: 5}}
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
        padding: 5,
        fontSize: 20,
        fontWeight: '300',
        color: '#000000',
    },
    chorus: {
        fontStyle: 'italic'
    },

    bold: {
        fontWeight: 'bold'
    }
});

module.exports = SongView;