import React from 'react'
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal} from "react-native-paper";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import ChangeTargetDialog from "./ChangeTargetDialog";
import valuesToPercentage from "../utilities";

export default function MainScreen() {

    const [target, setTarget] = React.useState(2000);
    const [water, setWater] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    const [isDialogVisible, setIsDialogVisible] = React.useState(false);

    const addWater = () => {
        setWater(water + 330);
        setPercentage(valuesToPercentage(target, water))
        onToggleSnackBar();
        console.log(water);
    }

    const resetWater = () => {
        setWater(0);
        setPercentage(0);
    }

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
                    setTarget={setTarget}
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