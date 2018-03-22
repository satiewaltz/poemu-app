import React, { Component } from 'react';
import {
  CameraRoll, Dimensions, Text,
  View, StyleSheet, TouchableOpacity
} from 'react-native';
import { Camera, Permissions } from 'expo';

import { Button } from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';
import { Icon } from 'react-native-elements'

import { ACCESS_KEY, SECRET_KEY } from 'react-native-dotenv'

const accessKey = ACCESS_KEY;
const secretKey = SECRET_KEY;

export default class CameraApp extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync()
        .then((data) => {
          console.log(data);

          const file = {
            uri: data.uri,
            name: 'photo.jpg',
            type: 'image/jpeg'
          };

          const options = {
            keyPrefix: 'pictures/',
            bucket: 'poamu',
            region: 'us-east-1',
            accessKey,
            secretKey,
            successActionStatus: 201
          };

          RNS3.put(file, options).then(response => {
            if (response.status !== 201) {
              throw new Error('Failed to upload image to S3', response);
            }
            console.log('*** BODY ***', response.body);
          });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const cameraIconSize = 55;
      const paddingSize = 20;

      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: paddingSize
                }}
                onPress={() => this.snap()}
                >
                <Icon
                  name='camera'
                  size={cameraIconSize}
                  color='white'/>
              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  top: paddingSize
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon
                  name='switch-camera'
                  size={cameraIconSize}
                  color='white'/>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  cameraContainer: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    backgroundColor: 'salmon'
  }
});

