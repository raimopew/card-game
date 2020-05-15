import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { db } from '../src/config.jsx';

let addQuestion = (question, category) => {
  db.ref('/questions').push({
    question: question,
    category: category
  });
};


export default class HomeScreen extends Component {

constructor() {
  super();
  this.state = {
    question: '',
    category: ''
  };

  this.handleQuestionChange = this.handleQuestionChange.bind(this);
  this.handleCategoryChange = this.handleCategoryChange.bind(this);
}

  handleQuestionChange (e) {
    this.setState({ question: e.nativeEvent.text });
  }

  handleCategoryChange (e) {
    this.setState({ category: e.nativeEvent.text });
  }


    handleSubmit = () => {
    if(this.state.question.length < 6){
      Alert.alert('Question must be atleast 6 letters long!');
    } else{
    addQuestion(this.state.question, this.state.category);
    Alert.alert('Question saved successfully');
    }
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
                value={this.state.question}
                onChange = {this.handleQuestionChange}
            />
            <TextInput
                style={styles.input}
                label='Category'
                mode="outlined"
                value={this.state.category}
                onChange = {this.handleCategoryChange}
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
