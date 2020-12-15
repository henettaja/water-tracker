import * as React from 'react';
import {Button, Dialog, Portal, Provider, Text, TextInput} from "react-native-paper";
import * as firebase from "firebase";

export default function SettingsDialog(props) {

    const[bottleVolume, setBottleVolume] = React.useState(0);
    const[cupVolume, setCupVolume] = React.useState(0);
    const[oldBottleVolume, setOldBottleVolume] = React.useState(0);
    const[oldCupVolume, setOldCupVolume] = React.useState(0);


    function updateWaterCup(volume) {
        firebase.database().ref('containers/001/').update(
            {
                'waterCup': volume,
            }
        ).then(() => null);
    }

    function updateWaterBottle(volume) {
        firebase.database().ref('containers/001/').update(
            {
                'waterBottle': volume,
            }
        ).then(() => null);
    }

    React.useEffect(() => {
        firebase.database().ref('containers/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setOldBottleVolume(prods[0]);
            setOldCupVolume(prods[1]);
        })
    })

    return (
        <Provider>
            <Portal>
                <Dialog
                    visible={props.isDialogVisible}
                    onDismiss={() => props.setIsDialogVisible(false)}>
                    <Dialog.Title>Settings</Dialog.Title>
                    <Dialog.Content style={{alignContent: 'space-around'}}>
                        <Text>Here you can customize the volumes of the water cup and bottle
                            to match your own to make adding water quick and easy.</Text>

                        <Text>{`
Current volumes:

Water cup: ${oldCupVolume} ml
Water bottle: ${oldBottleVolume} ml`
                        }</Text>

                        <TextInput
                            style={{marginTop: 30}}
                            label="Volume of your water cup"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            theme={{colors: {primary: '#2176FF'}}}
                            onChangeText={text => setCupVolume(text)}
                        />
                        <TextInput
                            style={{marginTop: 60}}
                            label="Volume of your water bottle"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            theme={{colors: {primary: '#2176FF'}}}
                            onChangeText={text => setBottleVolume(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            theme={{colors: {primary: '#2176FF'}}}
                            onPress={() => {
                                props.setIsDialogVisible(false);
                                if (!isNaN(bottleVolume) && !isNaN(cupVolume)) {
                                    updateWaterBottle(parseInt(bottleVolume));
                                    updateWaterCup(parseInt(cupVolume));
                                } else if (!isNaN(bottleVolume)) {
                                    updateWaterBottle(parseInt(bottleVolume));
                                } else if (!isNaN(cupVolume)) {
                                    updateWaterCup(parseInt(cupVolume));
                                }
                            }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    )
}