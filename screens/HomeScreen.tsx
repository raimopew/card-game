import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
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
                label='Test'
                mode="outlined"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        width: 300,
        alignSelf: "center"
    },
});