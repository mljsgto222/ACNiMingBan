import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    WebView,
    TouchableOpacity,
    Image,
} from 'react-native';

import AnoBBS from '../AnoBBS';

const MAX_IMAGE_WIDTH = 100;
const MAX_IMAGE_HEIGHT = 100;

export default class PostItem  extends Component {
    constructor() {
        super();
        this.state = {
            height: 0,
            imageWidth: 0,
            imageHeight: 0
        }
    }

    renderImage(){
        if(this.props.post.img){
            let uri = AnoBBS.getThumbImage(this.props.post.img, this.props.post.ext);
            let self = this;
            Image.getSize(uri, (width, height) => {
                let rate = width / height;
                if(width > MAX_IMAGE_WIDTH){
                    width = MAX_IMAGE_WIDTH;
                    height = MAX_IMAGE_WIDTH / rate;
                }
                if(height > MAX_IMAGE_HEIGHT){
                    height = MAX_IMAGE_HEIGHT;
                    width = height * rate;
                }
                self.setState({
                    imageWidth: width,
                    imageHeight: height
                });
            });
            return (
                <View style={style.image}>
                    <Image

                        resizeMode="cover"
                        style={{width: this.state.imageWidth, height: this.state.imageHeight}}
                        source={{uri: uri}}
                    />
                </View>
                
            )
        }
    }

    render(){
        let cssStyle = 'body{padding:0,font-size:14px;margin:0;display:inline-block}';
        let script = 'window.location.hash=1;document.title=document.body.offsetHeight';
        let html = `<!DOCUMENT html><html><header><style>${cssStyle}</style></header><body>${this.props.post.content}<script>${script}</script></body></html>`
        return (
            <TouchableOpacity onPress={this.onPostPress.bind(this)}>
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
                    { this.renderImage() }
                </View>
            </TouchableOpacity>
        );
    }

    onNavigationStateChange(state) {
        this.setState({
            height: parseInt(state.title)
        });
    }

    onPostPress() {
        if(this.props.navigation){
            this.props.navigation.navigate('PostDetail', {post: this.props.post})
        }
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
    }
});

PostItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

AppRegistry.registerComponent('PostItem', () => PostItem);