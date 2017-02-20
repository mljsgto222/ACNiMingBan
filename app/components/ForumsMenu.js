import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import AnoBBS from '../AnoBBS';

export default class ForumsMenu extends Component{
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => {
            return row1.id !== row2.id;
        }});
        this.state = {
            forums: null
        };
    }

    componentWillMount() {
        this._load();
    }

    render() {
        if(this.state.forums){
            return (
                <View style={style.menu}>
                    <ListView 
                        dataSource={this.state.forums}
                        renderRow= {(rowData) => {
                            return (
                                <TouchableOpacity onPress={this.onSelected.bind(this, rowData)}>
                                    <View style={style.item}>
                                        <Text style={style.title}>{rowData.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            );
        }else{
            return (
                <ActivityIndicator 
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                />
            );
        }
    }

    onSelected(forum) {
        this.props.onForumSelected && this.props.onForumSelected(forum);
    }

    _load(){
        let self = this;
        return AnoBBS.getForumList().then(function(forums){
            self.setState({
                forums: self.ds.cloneWithRows(forums)
            });
        });
    }
}

ForumsMenu.propTypes = {
    onForumSelected: React.PropTypes.func
}

const style = {
    menu: {
        flex: 1,
        backgroundColor: 'white',
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#ccc'
    },
    item: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 14
    }
}

AppRegistry.registerComponent('ForumsMenu', () => ForumsMenu);