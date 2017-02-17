import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class PostItem  extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.post.content = this.props.post.content.replace(/<br\/>/g, '\n');
    }

    render(){
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={[style.small, this.props.post.admin != 0 && style.admin]}>{this.props.post.userid}</Text>
                    <Text style={style.small}>No.{this.props.post.id}</Text>
                    <Text style={style.small}>{this.props.post.now}</Text>
                </View>
                <View>
                    <Text style={style.content}>{this.props.post.content}</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    header: {
        marginBottom: 16,
        flexDirection: 'row'
    },
    small: {
        fontSize: 12,
        marginRight: 6
    },
    admin: {
        color: 'red'
    },
    content: {
        fontSize: 14
    }
});

PostItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('PostItem', () => PostItem);