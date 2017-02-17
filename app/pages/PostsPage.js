/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    TouchableOpacity,
    ListView,
    ActivityIndicator,
    RefreshControl,
    View,
    Image
} from 'react-native';
const SideMenu = require('react-native-side-menu');

import AnoBBS from '../AnoBBS';
import PostItem from '../components/PostItem';
import ForumsMenu from '../components/ForumsMenu';

export default class NiMingBan extends Component {
    static navigationOptions = {
        title: '首页',
        header: ({state, setParams}) => {
            let right = (
                <TouchableOpacity onPress={() => {
                    state.instance.setState({
                        isMenuOpen: !state.instance.state.isMenuOpen
                    });
                }}>
                    <Image source={require('../images/navicon.png')} style={{ width: 35, height: 35}}></Image>
                </TouchableOpacity>
            );
            return { right };
        }
    }

    constructor() {
        super();

        this.init();
    }

    init() {
        this.posts = [];
        this.page = 1;
        this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => {
            return row1 && row2 && row1.id !== row2.id;
        }});
        this.state = {
            posts: null,
            refreshing: false,
            loading: false,
            isMore: true,
            isMenuOpen: false
        };
    }

    componentWillMount() {
        let self = this;
        AnoBBS.getForumList().then((forums) => {
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
            this.props.navigation.state.instance = this;
            return (
                <SideMenu 
                    menu={
                        <ForumsMenu onForumSelected={this.onForumSelected.bind(this)}/>
                    }
                    menuPosition="right"
                    isOpen={this.state.isMenuOpen}
                >
                    <View style={{flex: 1, backgroundColor: 'white'}}>
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
                    </View>
                </SideMenu>
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
        return AnoBBS.showf(self.forumsId, self.page).then((posts) => {
            self.isMore = posts.length > 0;
            if(self.isMore){
                self.posts = self.posts.concat(posts);
                self.page += 1;
            }

            self.setState({
                posts: self.ds.cloneWithRows(self.posts)
            });

            return posts;
        });
    }

    onEndReached() {
        if(this.isMore && !this.state.loading){
            let self = this;
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

    onForumSelected(forum) {
        this.forumsId = forum.id;
        this.posts = [];
        this.page = 1;
        this.setState({
            posts: null,
            isMenuOpen: false
        });

        this._load();
    }
}
