import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, Image } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { db } from '../src/config.jsx';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      category: '',
      modalVisible: false
    };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleQuestionChange(e) {
    this.setState({ question: e.nativeEvent.text });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.nativeEvent.text });
  }

  addQuestion = (question, category) => {
    db.ref('/questions').push({
      question: question,
      category: category
    });
  };



   handleSubmit = () => {
    if(this.state.question.length < 6){
      Alert.alert('Question must be atleast 6 letters long!');
    } else{
    this.addQuestion(this.state.question, this.state.category);
    Alert.alert('Question saved successfully');
    }
   };
      


  handleModalViewPress = () => {
    let isModalVisible = this.state.modalVisible;
    if (isModalVisible) {
      isModalVisible = false;
    } else {
      isModalVisible = true;
    }
    this.setState({
      modalVisible: isModalVisible
    });
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/question.jpg')}
        />
        <Button
          icon="rocket"
          onPress={() => navigation.navigate('Themes')}>
          Start game
            </Button>
        <Button
          icon="rocket"
          onPress={this.handleModalViewPress}>
          Add new questions
            </Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            navigation.navigate("Home");
          }}>
          <View
            style={styles.modalWindow}
          >
            <Title>Add a question</Title>
            <TextInput
              style={styles.input}
              label='Question'
              mode="outlined"
              value={this.state.question}
              onChange={this.handleQuestionChange}
            />
            <TextInput
              style={styles.input}
              label='Category'
              mode="outlined"
              value={this.state.category}
              onChange={this.handleCategoryChange}
            />
            <Button
              color="#841584"
              onPress={this.handleSubmit}>
              Upload
                  </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.handleModalViewPress}>
              Close
                  </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  separator: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  image: {
    width: 400,
    height: 500,
    marginBottom: 40
  },
  input: {
    marginTop: 20,
    width: 300,
    alignSelf: "center"
  },
  modalWindow: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});
