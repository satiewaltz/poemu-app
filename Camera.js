
import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

import { Input, Button } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios'
import { ACCESS_KEY, SECRET_KEY } from 'react-native-dotenv';

const accessKey = ACCESS_KEY;
const secretKey = SECRET_KEY;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc7475',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButtons: {
    backgroundColor: "#fff",
    width: 135,
    height: 35,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100,
    marginTop: 10,
    marginHorizontal: 3,
    // fontWeight: '100'
  }
});

export default class CameraView extends React.Component {
  state = {
    image: null,
    uploading: false,
    wordCount: 5,
    text: ""
  };

  render() {
    let { image } = this.state;

    return (
      <View style={ styles.container }>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
            color: "#fff",
            fontWeight: '100',
          }}>
          Leave a thought on a picture of yours.{"\n"}
          Be mindful, you've got { this.state.wordCount > -1 ? this.state.wordCount : 0 } words to use.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-around',
            marginTop: -8
          }}>
          <Button
            titleStyle={{
              color: "#fc7475",
              fontWeight: '100',
              fontSize: 13,
            }}
            buttonStyle={styles.cameraButtons}
            onPress={this._pickImage}
            title="Camera Roll"/>
          <Button
            titleStyle={{
              color: "#fc7475",
              fontWeight: '100',
              fontSize: 13,
            }}
            buttonStyle={styles.cameraButtons}
            onPress={this._takePhoto}
            title="Take a Photo"/>
       </View>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />

        <Input
          placeholder='Share your words.'
          placeholderTextColor='#ccc'
          onChangeText={(text) =>
            this.setState({
              text,
              wordCount: 6 - text.split(' ').length ? 6 - text.split(' ').length : 0
            })}
          value={this.state.text}
          shake={true}
          containerStyle={{
            // width: 135,
            // height: 35,
            backgroundColor: '#7476fc',
            borderColor: "#fc7475",
            borderWidth: 1,
            borderRadius: 100,
            marginTop: 14
          }}
          inputStyle={{ color: "#fff", fontWeight: '300'}}
        />

        {
          // Hide submit if word count is too high.
          this.state.wordCount > 0 &&
            <Button
              onPress={this._maybeRenderImage}
              title='Submit'
              titleStyle={{
                color: "#fff",
                fontWeight: '100',
                fontSize: 13,
              }}
              buttonStyle={{
                backgroundColor: "#6fe86d",
                width: 135,
                height: 35,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 100,
                marginTop: 15
              }}/>
        }
        </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {decodeURIComponent(image)}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        console.log(pickerResult, "------------- Selected Image");
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // console.log(uploadResponse, 'uploadResonse ===========');
        // this.setState({ image: uploadResponse.postResponse.location });
        this.setState({ image: pickerResult.uri })
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

    const file = {
      uri,
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

    // Upload picture to s3 bucket
    // There is no delete method yet for RNS3
    // so we can't delete if the user wants to take another
    // picture.
    return RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        this.setState({ cachedURI: null });
        throw new Error('Failed to upload image to S3', response);
      }

      axios.post('http://192.168.1.3:3000/addpic', {
        url: decodeURIComponent(response.body.postResponse.location)
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log('*** BODY ***', response.body);
      return response.body;
    });
}
