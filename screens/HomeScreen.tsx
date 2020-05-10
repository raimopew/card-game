import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { db } from '../src/config.jsx';

let addQuestion = (quest, cat) => {
  db.ref('/questions').push({
    question: quest,
    category: cat
  });
};


export default class HomeScreen extends Component {


  state = {
    question: '',
    category: ''
  };

  handleChange = e => {
    this.setState({
      question: e.nativeEvent.text,
      category: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    addQuestion(this.state.question, this.state.category);
    Alert.alert('Quetion saved successfully');
  };


render() {
  const { navigation } = this.props;
    return (
        <View>
            <Button
                icon="rocket"
                mode="contained"
                onPress={() => navigation.navigate('Game')}>
                    Go to Game
            </Button>
            <TextInput
                style={styles.input}
                label='Question'
                mode="outlined"
                onChange = {this.handleChange}
            />
            <TextInput
                style={styles.input}
                label='Category'
                mode="outlined"
                onChange = {this.handleChange}
            />
            <Button
            color="#841584"
            onPress={this.handleSubmit}>
            Upload
            </Button>

        </View>
    );
  }
}









const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        width: 300,
        alignSelf: "center"
    },
});
