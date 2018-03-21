import React from 'react';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const AppHeader = (props) =>
  <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{
      text: 'Poems of the World', style: { color: '#fff' }
    }}
    rightComponent={{
      icon: 'home',
      color: '#fff',
      onPress: () => props.navigation.navigate('Home')
    }}
    backgroundColor='#fc7475'
  />;

export default withNavigation(AppHeader);
