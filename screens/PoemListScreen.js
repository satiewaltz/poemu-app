import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';

import { Button, Header } from 'react-native-elements';

export default class PoemListScreen extends React.Component {
  static navigationOptions = {
    title: 'Poems'
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: 'Poems of the World', style: { color: '#fff' }
          }}
          rightComponent={{
            icon: 'home',
            color: '#fff',
            onPress: this._handlePress
          }}
          backgroundColor='#fc7475'
        />
        <View style={styles.container}>
          <Text style={styles.appText} onPress={this._handlePress}>HomeScreen!</Text>
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
    width: '100%',
    height: '90%',
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
