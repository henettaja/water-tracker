import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal} from "react-native-paper";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import ChangeTargetDialog from "./ChangeTargetDialog";
import valuesToPercentage, {today} from "../utilities";
import * as firebase from "firebase";

export default function MainScreen() {

    const [target, setTarget] = React.useState(0);
    const [water, setWater] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    const [isDialogVisible, setIsDialogVisible] = React.useState(false);

    const defineTarget = (userTarget) => {
        firebase.database().ref('users/001/').update(
            {'waterTarget': userTarget}
        ).then(r => null);
        firebase.database().ref('targets/001/').update(
            {'waterTarget': userTarget}
        ).then(r => null);
    }

    const addWater = () => {
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': water + 330, 'date': today(), 'percentage': valuesToPercentage(target, water + 330)}
        ).then(r => null);
        firebase.database().ref('waterAmounts/001/' + today() + '/').update(
            {'waterAmount': water + 330, 'date': today(), 'percentage': valuesToPercentage(target, water + 330)}
        ).then(r => null);
        firebase.database().ref('datesTracked/001/' + today() + '/').update(
            {'date': today()}
        ).then(r => null);
        onToggleSnackBar();
    }

    const resetWater = () => {
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': 0, 'date': today(), 'percentage': 0}
        ).then(r => null);
        setPercentage(0);
    }

    React.useEffect(() => {
        firebase.database().ref('targets/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setTarget(prods[0]);
        })
        firebase.database().ref('users/001/' + today() + '/').on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const prods = Object.values(data);
                setWater(prods[2]);
            } else {
                console.log("No data for today yet")
                return null;
            }
        })
        firebase.database().ref('users/001/' + today() + '/').on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const prods = Object.values(data);
                setPercentage(prods[1]);
            } else {
                console.log("No data for today yet")
                return null;
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <Title>Today</Title>
            <Chip
                mode='outlined'
                icon='information'
                selectedColor='#2176FF'
                style={{marginTop: 10}}
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