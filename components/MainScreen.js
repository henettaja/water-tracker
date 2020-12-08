import React from 'react'
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal} from "react-native-paper";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import ChangeTargetDialog from "./ChangeTargetDialog";
import valuesToPercentage, {today} from "../utilities";
import * as firebase from "firebase";
import {DateTime} from "luxon/src/datetime";

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

export default function MainScreen() {

    const [target, setTarget] = React.useState(2000);
    const [water, setWater] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    const [isDialogVisible, setIsDialogVisible] = React.useState(false);

    const defineTarget = () => {
        setTarget(1500);
        firebase.database().ref('users/001/').update(
            {'waterTarget': target}
        ).then(r => null);
    }

    const addWater = () => {
        setWater(water + 330)
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': water, 'date': today()}
        ).then(r => null);
        onToggleSnackBar();
        setPercentage(valuesToPercentage(target, water))
    }

    const resetWater = () => {
        setWater(0);
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': water, 'date': today()}
        ).then(r => null);
        setPercentage(0);
    }

    React.useEffect(() => {
        /*firebase.database().ref('users/001/target/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setTarget(prods)
        })*/
    }, []);

    return (
        <View style={styles.container}>
            <Title>Water intake tracker</Title>
            <Chip
                mode='outlined'
                icon='information'
                selectedColor='#2176FF'
                onPress={() => setIsDialogVisible(true)}>
                Water target: {target} ml
            </Chip>
            <View style={styles.content}>
                <AnimatedCircularProgress
                    style={{alignSelf: 'center'}}
                    size={250}
                    width={50}
                    rotation={270}
                    arcSweepAngle={180}
                    fill={percentage}
                    tintColor="#2176FF"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    children={
                        () => (
                            <View style={{alignItems: 'center'}}>
                                <Title>
                                    { water } ml
                                </Title>
                                <Text>
                                    {percentage} %
                                </Text>
                            </View>
                        )
                    }
                    backgroundColor="#5C6B70"/>
                <View style={styles.buttons}>
                    <Button icon="plus" mode="contained" onPress={() => addWater()}>
                        Add water
                    </Button>
                    <Button icon="plus" mode="contained" onPress={() => resetWater()}>
                        Reset water
                    </Button>
                </View>
            </View>
            <Snackbar
                visible={visible}
                duration={2500}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Reset',
                    onPress: () => resetWater()
                }}>
                Your daily water intake level is now {percentage}%!
            </Snackbar>
            <Portal>
                <ChangeTargetDialog
                    isDialogVisible={isDialogVisible}
                    setIsDialogVisible={setIsDialogVisible}
                    setTarget={defineTarget}
                    target={target}
                />
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    buttons: {
        flex: 0,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-evenly',
    },
});