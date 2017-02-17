/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Button,
    ListView,
    ActivityIndicator,
    RefreshControl,
    View
} from 'react-native';

import AnoBBS from '../AnoBBS';
import PostItem from '../components/PostItem';

export default class NiMingBan extends Component {
    static navigationOptions = {
        title: '首页',
        header: {

        }
        
    }

    constructor() {
        super();

        this.init();
    }

    init() {
        this.posts = [];
        this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => {
            return row1 && row2 && row1.id !== row2.id;
        }});
        this.state = {
            posts: null,
            refreshing: false,
            loading: false
        };
    }

    componentWillMount() {
        let self = this;
        AnoBBS.getForumList().then(function(forums){
            if(forums[0]){
                self.forumsId = forums[0].id;
                return self._load();
            }else{
                throw {
                    message: '没有发现板块！'
                };
            }
            
        });

    }

    render() {
         if(this.state.posts){
            return (
                <View style={{flex: 1}}>
                    <ListView
                        refreshControl={
                            <RefreshControl 
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={20}
                        style={{flex: 1}}
                        dataSource={this.state.posts}
                        renderRow={(rowData) => {
                            return (
                                <PostItem post={rowData} />
                            );
                        }}
                    />
                    <ActivityIndicator 
                        animating={this.state.loading}
                        style={{alignItems: 'center', height: 30}}
                    />
                </View>
            )
        } else {
            return (
                <ActivityIndicator 
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
                />
            )
        }
    }

    _load() {
        let self = this;
        return AnoBBS.showf(self.id, self.page).then((posts) => {
            self.posts = self.posts.concat(posts);
            self.page += 1;
            self.setState({
                posts: self.ds.cloneWithRows(self.posts)
            });
            return posts;
        });
    }

    onEndReached() {
        let self = this;
        if(!this.state.loading){
            self.setState({loading: true});
            this._load().catch(() => {

            }).then(() => {
                self.setState({loading: false});
            });
        }
    }

    onRefresh() {
        let self = this;
        if(!self.state.refreshing){
            self.posts = [];
            self.page = 1;
            self.setState({refreshing: true});
            self._load().catch((error) => {

            }).then(() => {
                self.setState({refreshing: false});
            });
        }
    }
}
