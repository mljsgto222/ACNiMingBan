/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';

const NiMingBan =  StackNavigator({
    Posts: { screen: PostsPage },
    PostDetail: { screen: PostDetailPage }
}, {
    headerMode: 'float'
});

AppRegistry.registerComponent('NiMingBan', () => NiMingBan);
