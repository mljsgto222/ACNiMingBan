import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    WebView
} from 'react-native';


export default class PostItem  extends Component {
    constructor() {
        super();
        this.state = {
            height: 0
        }
    }

    render(){
        let cssStyle = 'body{padding:0,font-size:14px;margin:0;display:inline-block}';
        let script = 'window.location.hash=1;document.title=document.body.offsetHeight';
        let html = `<!DOCUMENT html><html><header><style>${cssStyle}</style></header><body>${this.props.post.content}<script>${script}</script></body></html>`
        
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={[style.small, this.props.post.admin != 0 && style.admin]}>{this.props.post.userid}</Text>
                    <Text style={style.small}>No.{this.props.post.id}</Text>
                    <Text style={style.small}>{this.props.post.now}</Text>
                </View>
                <View>
                    <WebView
                        source={{html: html}}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={false}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                        style={{height: this.state.height}}
                    />
                </View>
            </View>
        );
    }

    onNavigationStateChange(state) {
        this.setState({
            height: parseInt(state.title)
        });
    }
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
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
});

PostItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('PostItem', () => PostItem);