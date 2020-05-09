import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function SettingsScreen({ navigation }) {
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
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20 
    },
});