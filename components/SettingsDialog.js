import * as React from 'react';
import {Button, Dialog, Modal, Portal, Provider, Text, TextInput, Title} from "react-native-paper";
import * as firebase from "firebase";

export default function SettingsDialog(props) {

    const[bottleVolume, setBottleVolume] = React.useState();
    const[cupVolume, setCupVolume] = React.useState();


    function updateWaterCup(volume) {
        firebase.database().ref('containers/001/').update(
            {
                'waterCup': volume,
            }
        ).then(r => null);
    }

    function updateWaterBottle(volume) {
        firebase.database().ref('containers/001/').update(
            {
                'waterBottle': volume,
            }
        ).then(r => null);
    }

    React.useEffect(() => {
        firebase.database().ref('containers/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setBottleVolume(prods[0]);
            setCupVolume(prods[1]);
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

Water cup: ${cupVolume} ml
Water bottle: ${bottleVolume} ml`
                        }</Text>

                        <TextInput
                            style={{marginTop: 30}}
                            label="Volume of your water cup"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            onChangeText={text => setCupVolume(text)}
                        />
                        <TextInput
                            style={{marginTop: 60}}
                            label="Volume of your water bottle"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
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