import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { db } from '../src/config.jsx';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {

constructor() {
  super();
  this.state = {
    data: {},
    categories: []
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



componentDidMount = async() => {
  await this.fetchData()
}

componentDidUpdate = () => {
  if(this.state.categories.length < 1 && this.state.data) this.setCategories()
}

setCategories = () => {
  const values = []
  for(let [key, value] of Object.entries(this.state.data)) {
    values.push(value)
  }
  this.setState({
    categories: values
  })
}

handlePress = async(value) => {
  const { navigation } = this.props;
  try {
    const response = await AsyncStorage.setItem('category', value)
    const category = await AsyncStorage.getItem('category')
    navigation.reset({
      index: 1,
      routes: [{ name: 'Game' }],
    });
  } catch (error) {
    console.log(error)
  }
}

fetchData = async() => {
  const ref = db.ref('/questions')
  await ref.on('value', (snapshot) => { this.setState({
    data: snapshot.val()
  }) }, (err: string) => console.log(err))
}

render() {
  const { navigation } = this.props;
  const { categories} = this.state;
    return (
        <View>
          {categories.map((item, i) =><View key = {i}><Button
                icon="rocket"
                mode="contained"
                onPress={() => this.handlePress(item.category)}
                >
                    {item.category}
            </Button></View>)}
           
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
