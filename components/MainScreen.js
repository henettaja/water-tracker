import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal} from "react-native-paper";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import ChangeTargetDialog from "./ChangeTargetDialog";
import valuesToPercentage, {today} from "../utilities";
import * as firebase from "firebase";
import CustomWaterDialog from "./CustomWaterDialog";

const screenWidth = Dimensions.get("window").width;

export default function MainScreen() {

    const [target, setTarget] = React.useState(0);
    const [targetReach, setTargetReach] = React.useState(false);
    const [water, setWater] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    const [waterCup, setWaterCup] = React.useState(330);
    const [waterBottle, setWaterBottle] = React.useState(500);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

    const [isTargetDialogVisible, setIsTargetDialogVisible] = React.useState(false);
    const [isCustomDialogVisible, setIsCustomDialogVisible] = React.useState(false);



    const defineTarget = (userTarget) => {
        firebase.database().ref('users/001/').update(
            {'waterTarget': userTarget}
        ).then(() => null);
        firebase.database().ref('targets/001/').update(
            {'waterTarget': userTarget}
        ).then(() => null);
    }

    const addWater = (amount) => {
        if (amount) {
            firebase.database().ref('users/001/' + today() + '/').update(
                {
                    'waterAmount': water + amount,
                    'date': today(),
                    'percentage': valuesToPercentage(target, water + amount)
                }
            ).then(() => null);
            onToggleSnackBar();
        }
        if (valuesToPercentage(target, water + amount) >= 100) setTargetReach(true);
    }

    const resetWater = () => {
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': 0, 'date': today(), 'percentage': 0}
        ).then(() => null);
        setPercentage(0);
    }

    React.useEffect(() => {
        firebase.database().ref('targets/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setTarget(prods[0]);
        })
        firebase.database().ref('containers/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setWaterBottle(prods[0]);
            setWaterCup(prods[1]);
        })
        firebase.database().ref('users/001/' + today() + '/').on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const prods = Object.values(data);
                setWater(prods[2]);
                setPercentage(prods[1]);
                if (prods[2]<100) {
                    setTargetReach(false);
                }
            } else {
                addWater(0);
            }
        })
    }, []);

    React.useEffect(() => {
        console.log("target state change " + targetReach);
        if (targetReach===true) {
            onToggleTargetSnackBar();
            console.log("Target reached!")
        }
    }, [targetReach])

    return (
        <View style={styles.container}>
            <Title>Today</Title>
            <Chip
                mode='outlined'
                icon='information'
                selectedColor='#2176FF'
                style={{marginTop: 10}}
                onPress={() => setIsTargetDialogVisible(true)}>
                Water target: {target} ml
            </Chip>
            <View style={styles.content}>
                <AnimatedCircularProgress
                    style={styles.progress}
                    size={245}
                    width={32}
                    rotation={0.25}
                    arcSweepAngle={360}
                    fill={percentage}
                    tintColor="#2176FF"
                    backgroundColor="#131A26"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    childrenContainerStyle={styles.circle}
                    children={
                        () => (
                            <View style={{alignItems: 'center', transform: [{ rotate: "-45deg"}],}}>
                                <Title>
                                    { water } ml
                                </Title>
                                <Text>
                                    {percentage} %
                                </Text>
                            </View>
                        )
                    }
                />
                <View style={styles.addContainer}>
                    <Title style={{marginHorizontal: 70}}>+ Add a portion of water</Title>
                    <View style={styles.buttons}>
                        <Button icon="cup" mode="contained" onPress={() => addWater(waterCup)}>
                            Cup
                        </Button>
                        <Button icon="glass-stange" mode="contained" onPress={() => addWater(waterBottle)}>
                            Bottle
                        </Button>
                        <Button icon="water" mode="contained" onPress={() => setIsCustomDialogVisible(true)}>
                            Something else
                        </Button>
                    </View>
                </View>
            </View>
            <Snackbar
                visible={visible}
                duration={2500}
                onDismiss={onDismissSnackBar}
                theme={{ colors: { surface: '#FFFFFF'}}}
                action={{
                    label: 'Reset',
                    onPress: () => resetWater()
                }}>
                Your daily water intake level is now {percentage}%!
            </Snackbar>
            <Snackbar
                visible={targetSnackVisible}
                duration={2500}
                onDismiss={onDismissTargetSnackBar}
                theme={{ colors: { surface: '#FFFFFF', onSurface: '#FDCA40', accent: '#FFFFFF'}}}
                action={{
                    label: 'Yay!',
                    onPress: () => onDismissTargetSnackBar()
                }}>Congrats, you reached your water intake goal!</Snackbar>
            <Portal>
                <ChangeTargetDialog
                    isDialogVisible={isTargetDialogVisible}
                    setIsDialogVisible={setIsTargetDialogVisible}
                    setTarget={defineTarget}
                />
                <CustomWaterDialog
                    isDialogVisible={isCustomDialogVisible}
                    setIsDialogVisible={setIsCustomDialogVisible}
                    addWater={addWater}
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
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    addContainer: {
        flex: 1,
        flexGrow: 0.45,
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth,
        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth-100,
        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    circle: {
        width: 181,
        height: 181,
        borderRadius: 120,
        borderWidth: 5,
        backgroundColor: '#27354d',
        borderColor: "#0051d4",
        borderTopLeftRadius: 10,
        borderBottomWidth: 10,
        borderRightWidth: 10,
        transform: [{ rotate: "45deg"}],
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10.00,
        elevation: 10,
    },
    progress: {
        width: 264,
        height: 264,
        marginBottom: 10,
        borderRadius: 300,
        borderWidth: 10,
        borderColor: "#0051d4",
        overflow: 'hidden',
    }
});