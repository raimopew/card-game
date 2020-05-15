import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ThemeScreen from "../screens/ThemeScreen";

const Tab  = createMaterialTopTabNavigator();
console.disableYellowBox = true;
export default function Main() {
    return (
        <Tab.Navigator style={styles.nav} initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Themes"
                component={ThemeScreen}
            />
            <Tab.Screen
                name="Game"
                component={GameScreen}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    nav: {
        marginTop: 20
    },
});