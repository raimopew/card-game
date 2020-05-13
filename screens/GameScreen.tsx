import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { db } from '../src/config.jsx';
import AsyncStorage from '@react-native-community/async-storage';

let selectedTheme = ""; // TODO: this should come in from a different view

export default class GameScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          questions: [],
          currentQuestion: {
              question: ""
          },
          data: {}
      };
    }

    readQuestions = () => {
        let currComp = this;
        db.ref("/questions").once("value", function(snapshot){
            let questionsFromDb = [];
            for(var key in snapshot.val()){
                questionsFromDb.push(snapshot.val()[key]);
            }
            let gameQuestions = [];
            if(selectedTheme.length > 0 && selectedTheme != ""){
                questionsFromDb.forEach(question => {
                    if(question.theme == selectedTheme){
                        gameQuestions.push(question);
                    }
                });
            }
            if(gameQuestions.length == 0){
                gameQuestions = questionsFromDb;
            }
            currComp.setState({
                questions: gameQuestions
            });
        });
    };

    handleNextQuestion = () => {
        let questionsObj = this.state.questions;
        questionsObj.forEach(question => {
            if(question === this.state.currentQuestion){
                delete this.state.questions[question];
            }
        });
        this.setCurrentQuestion();
    }

    setCurrentQuestion = () => {
        let questionsArr = this.state.questions;
        this.state.currentQuestion = questionsArr[Math.floor(Math.random() * questionsArr.length)];
    }

    async componentDidMount(){
        this.readQuestions();
        this.setCurrentQuestion();
        await this.getCategory();
    }
    
    getCategory = async() => { 
        const category = await AsyncStorage.getItem('category')
        console.log(category)
    }

    fetchData = async() => {
        console.log(this.state.questions)
        const ref = db.ref('/questions')
        await ref.on('value', (snapshot) => { this.setState({
          data: snapshot.val()
        }) }, (err: string) => console.log(err))
      }

    render() {
      const { navigation } = this.props;
        return (
            <View>
                <Button
                    icon="rocket"
                    mode="contained"
                    onPress={() => navigation.navigate('Settings')}>
                        Go to Settings
                </Button>
                <Button
                    style={styles.button}
                    icon="rocket"
                    mode="contained"
                    onPress={() => navigation.goBack()}>
                        Go back
                </Button>
                <Text numberOfLines={10}>{/*this.state.currentQuestion.question*/}</Text>
                <Button onPress={this.handleNextQuestion}>Next question</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20 
    },
});