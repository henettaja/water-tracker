import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Bottomnav from "./components/Bottomnav"
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import { StyleSheet, View } from 'react-native';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDDJdE1_PFukKC53IoewJ9aK5zt83Ei1ao",
    authDomain: "water-tracker-us.firebaseapp.com",
    databaseURL: "https://water-tracker-us-default-rtdb.firebaseio.com/",
    projectId: "water-tracker-us",
    storageBucket: "water-tracker-us.appspot.com",
    messagingSenderId: "225268416727",
    appId: "1:225268416727:web:01c0005c7f8f4048637092"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

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
            text: '#FFFFFF'
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
