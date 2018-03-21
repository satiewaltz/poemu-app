import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';

import { Button, Divider } from 'react-native-elements';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };

  _handlePress = () => {
    this.props.navigation.navigate('PoemList');
  }

  render() {
    const resizeMode = 'center';

    return (
      <View style={styles.container}>
        <Image
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
          }}
          source={require('../assets/flowers.gif')}></Image>
        <Image
          style={
            {
              width: 200, height: 90,
              marginBottom: -15
            }}
          source={require('../assets/lily.gif')}></Image>

        <Text style={styles.appTitle}>poemu</Text>
        <Text style={styles.appMotto}>drops of distant thoughts</Text>
        <Divider style={{height: 1, backgroundColor: '#e1e8ee'}	} />
        <Button
          onPress={this._handlePress}
          title='Create Poem'
          titleStyle={{
            color: "#fc7475",
            fontSize: 13,
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            width: 135,
            height: 35,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 100,
            marginTop: 15
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc7475',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '100',
    color: '#fff'
  },
  appMotto: {
    fontSize: 10.25 ,
    fontStyle: 'italic',
    color: '#fff'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   appTitle: {
//     fontSize: 45,
//     fontWeight: '100',
//     color: '#000'
//   },
//   appMotto: {
//     fontSize: 10.25 ,
//     fontStyle: 'italic',
//     color: '#ccc',
//     opacity: 0.9
//   }
// });

// Old

