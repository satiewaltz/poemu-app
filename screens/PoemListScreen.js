import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';

import AppHeader from '../elements/Header';
import { List, ListItem } from 'react-native-elements'



const list = [
  {
    poem: `I come with no wrapping or pretty pink bows.
            I am who I am, from my head to my toes.
            I tend to get loud when speaking my mind.
            Even a little crazy some of the time.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    poem: `In all chaotic beauty lies a wounded work of art.
Beautiful but torn, wreaking havoc on my heart.
Camouflaged by insecurities, blinded by it all.
I love the way you sit there and barely notice me at all.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    poem: `I come with no wrapping or pretty pink bows.
            I am who I am, from my head to my toes.
            I tend to get loud when speaking my mind.
            Even a little crazy some of the time.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    poem: `In all chaotic beauty lies a wounded work of art.
Beautiful but torn, wreaking havoc on my heart.
Camouflaged by insecurities, blinded by it all.
I love the way you sit there and barely notice me at all.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },  {
    poem: `I come with no wrapping or pretty pink bows.
            I am who I am, from my head to my toes.
            I tend to get loud when speaking my mind.
            Even a little crazy some of the time.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    poem: `In all chaotic beauty lies a wounded work of art.
Beautiful but torn, wreaking havoc on my heart.
Camouflaged by insecurities, blinded by it all.
I love the way you sit there and barely notice me at all.

Source: https://www.familyfriendpoems.com/poems/other/short/`,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

export default class PoemListScreen extends React.Component {
  static navigationOptions = {
    title: 'Poems'
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader/>
        <View>
          <List containerStyle={{marginBottom: 20}}>
            {
              list.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{uri:l.avatar_url}}
                  key={i}
                  title={l.poem}
                />
              ))
            }
          </List>
        </View>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigation.navigate('Home');
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appText: {
    fontSize: 45,
    fontWeight: '100',
    color: '#fc7475',
  },
  appMotto: {
    fontSize: 10.25 ,
    fontStyle: 'italic',
    color: '#fff'
  }
});
