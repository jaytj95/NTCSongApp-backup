const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};

var styles = StyleSheet.create({
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
        color: '#6d3f77',
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
        backgroundColor: constants.actionColor,
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

module.exports = styles
module.exports.constants = constants;