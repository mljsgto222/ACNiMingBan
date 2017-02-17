/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import PostsPage from './pages/PostsPage';

const NiMingBan =  StackNavigator({
    Posts: { screen: PostsPage }
});

AppRegistry.registerComponent('NiMingBan', () => NiMingBan);
