import React, { Component } from 'react';
import {
    ActivityIndicator,
    ListView,
    View
} from 'react-native';

import AnoBBS from '../AnoBBS';
import PostItem from '../components/PostItem';

export default class PostDetailPage extends Component {
    static navigationOptions = {
        title: ({state}) => {
            return `No.${state.params.post.id}`
        },

    }

    constructor() {
        super();

    }

    init() {
        this.post = this.props.navigation.state.params.post;
        this.page = 1;
        this.isMore = false;
        this.isLoading = false;
        this.posts = [this.post];

        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => {
            row1.id != row2
        }});
        this.state = {
            posts: this.ds.cloneWithRows(this.posts),
            isLoading: false
        };
    }

    componentWillMount() {
        this.init();
        this._load();
    }

    render() {
        if(this.state.posts){
            return (
                <View style={{flex:1, backgroundColor: 'white'}}>
                    <ListView
                        dataSource={this.state.posts}
                        onEndReached={this.loadMore.bind(this)}
                        onEndReachedThreshold={20}
                        renderRow={rowData => {
                            return (
                                <PostItem post={rowData} />
                            );
                        }}
                    />
                </View>
            );
        }
    }

    _load() {
        let self = this;
        return AnoBBS.thread(self.post.id, self.page).then(posts => {
            let replies = posts.replys;
            self.isMore = replies.length > 0;
            if(replies.length > 0){
                self.posts = self.posts.concat(replies);
                self.page += 1;
            }

            self.setState({
                posts: self.ds.cloneWithRows(self.posts)
            });
        });
    }

    loadMore() {
        if(this.state.isLoading || this.isMore){
            this.setState({
                isLoading: true
            });

            let self = this;
            return this._load().then(() => {
                self.setState({
                    isLoading: false
                })
            });
        }
    }   
}