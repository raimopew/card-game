import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab  = createMaterialTopTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator style={styles.nav} initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Game"
                component={GameScreen}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    nav: {
        marginTop: 20
    },
});