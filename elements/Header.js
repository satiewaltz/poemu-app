import React from 'react';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const AppHeader = (props) =>
  <Header
    leftComponent={{
      icon: 'create',
      color: '#fff',
      onPress: () => props.navigation.navigate('Create')
    }}
    centerComponent={{
      text: 'Poems of the World', style: { color: '#fff', fontWeight: '100' }
    }}
    rightComponent={{
      icon: 'home',
      color: '#fff',
      onPress: () => props.navigation.navigate('PoemList')
    }}
    backgroundColor='#fc7475'
  />;

export default withNavigation(AppHeader);
