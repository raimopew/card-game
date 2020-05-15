import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ToggleButton } from 'react-native-paper';
import { Audio } from 'expo-av';

export default class SettingsScreen extends Component {




  async componentDidMount() {
  this.backgroundMusic = new Audio.Sound();
  try {
    await this.backgroundMusic.loadAsync(
      require("../assets/music/Jump_Around.mp3")
    );
    await this.backgroundMusic.setIsLoopingAsync(true);
    await this.backgroundMusic.playAsync();
  } catch (error) {
  }

}





render () {
  const { navigation } = this.props;
    return (
        <View>
            <Button
                icon="rocket"
                mode="contained"
                onPress={() => navigation.navigate('Home')}>
                    Go to Home
            </Button>
            <Button
                style={styles.button}
                icon="rocket"
                mode="outlined"
                onPress={() => navigation.goBack()}>
                    Go back
            </Button>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => this.backgroundMusic.stopAsync()}>
              Music off
            </Button>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => this.backgroundMusic.playAsync()}>
              Music on
            </Button>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20
    },
});
