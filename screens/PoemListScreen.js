import React from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, ActivityIndicator
} from 'react-native';

import AppHeader from '../elements/Header';
import { Card, ListItem } from 'react-native-elements';
import axios from 'axios';


export default class PoemListScreen extends React.Component {
  static navigationOptions = {
    title: 'Poems'
  };

  state = {
    poems: null,
    isLoading: true
  }

  componentDidMount() {
    axios.get(`https://poemu.now.sh/pics`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          isLoading: false,
          poems: res.data
        })
      })
      .catch((err) => console.log(err));
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(255,255,255,0.0)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fc7475" size="large" />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader/>

        {this._maybeRenderUploadingOverlay()}
        <ScrollView>
          { !this.state.isLoading &&
            this.state.poems.reverse().map((l, i) => (
              <Card key={i} containerStyle={{ padding: 0 }} image={{uri: l.url}}>
              <Text style={{marginBottom: 10}}>
                A traveler says: {l.text}
              </Text>
            </Card>
          ))}
        </ScrollView>
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
