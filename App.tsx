import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import Main from "./navigation/Main";

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Main/>
            </NavigationContainer>
        </PaperProvider>
    );
}