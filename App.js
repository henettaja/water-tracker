import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Bottomnav from "./components/Bottomnav"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import { StyleSheet, View } from 'react-native';

export default function App() {

    const theme = {
        ...DefaultTheme,
        dark: true,
        roundness: 15,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2176FF',
            accent: '#33A1FD',
            background: '#31393C',
            text: '#EADEDA'
        },
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Bottomnav/>
                </View>
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    content: {
        flex: 10,
        marginTop: 25,
    }
});
