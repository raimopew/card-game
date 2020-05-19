import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Modal } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { db } from '../src/config.jsx';

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: "",
      category: "",
      modalVisible: false
    };
  }

  handleModalViewPress = () => {
    const { navigation } = this.props;
    this.setState({
      modalVisible: false
    });
    navigation.navigate("Home");
  }

  handleNextQuestion = () => {
    let questionsArr = this.state.questions;
    if(questionsArr.length > 0){
      questionsArr.forEach(questionFromArr => {
        if(questionFromArr.question == this.state.currentQuestion){
          let index = questionsArr.indexOf(questionFromArr);
          let newQuestionsArr = [];
          if(questionsArr.length > 1 && index > -1){
            newQuestionsArr = questionsArr.splice(index, 1);
          }
          this.setState({
            questions: newQuestionsArr 
          });
          if(newQuestionsArr.length > 0){
            this.setCurrentQuestion();
          } else {
            this.displayEndScreen();
          }
          return;
        }
      });
    } else {
      this.displayEndScreen();
    }
  };

  displayEndScreen = () => {
    this.setState({
      modalVisible: true
    });
  }
  
  setStateForCurrentQuestion = (state, newQuestion) => {
    const newState = {...state, currentQuestion: newQuestion}
    return newState;
  }

  setCurrentQuestion = () => {
    let questionsArr = this.state.questions;
    let randomIndex = Math.floor(Math.random() * questionsArr.length);
    if(questionsArr[randomIndex].question !== undefined){
      this.setState(this.setStateForCurrentQuestion(this.state, questionsArr[randomIndex].question));
    }
  };

  async componentDidMount() {
    await this.getCategory();
  } 

  getCategory = async () => {
    const categoryFromDb = await AsyncStorage.getItem('category');
    this.setState({
      category: categoryFromDb
    });
    this.fetchData();
  };

  fetchData = async () => {
    const ref = db.ref('/questions');
    await ref.on(
      'value',
      (snapshot) => {
        let questionsFromDb = [];
        for (var key in snapshot.val()) {
          questionsFromDb.push(snapshot.val()[key]);
        }
        let gameQuestions = [];
        if (this.state.category !== null) {
          questionsFromDb.forEach((question) => {
            if (question.category == this.state.category) {
              gameQuestions.push(question);
            }
          });
        }
        if (gameQuestions.length == 0) {
          gameQuestions = questionsFromDb;
        }
        this.setState({
          questions: gameQuestions,
        });
        this.setCurrentQuestion(gameQuestions);
      },
      (err: string) => console.log(err)
    );
  };

  render() {
    const { navigation } = this.props;
    const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
    return (
      <View 
      style={styles.container}>
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
              <Title>Game over!</Title>
              <Paragraph>Press the button to return to the home menu</Paragraph>
              <Button
              style={styles.button}
              mode="contained"
              onPress={this.handleModalViewPress}>
                Back to home screen
              </Button>
            </View>
        </Modal>
        <Button
          style={styles.button}
          icon="rocket"
          mode="contained"
          onPress={() => navigation.goBack()}>
            Go back
        </Button>
        <Card style={styles.card}>
          <Card.Title title={this.state.currentQuestion} subtitle={this.state.category} left={LeftContent} />
        </Card>
        <Button 
          style={styles.button}
          icon="rocket"
          mode="contained"
          onPress={this.handleNextQuestion}>
          Next question
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  card: {
    paddingTop: 20
  },
  button: {
    marginTop: 20,
    
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
