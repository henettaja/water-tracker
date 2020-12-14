import * as React from 'react';
import {Dialog, Modal, Portal, Provider, Text, TextInput, Title} from "react-native-paper";
import * as firebase from "firebase";

export default function SettingsModal(props) {

    const containerStyle = {backgroundColor: '#131A26', margin: '10%', padding: 20};

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

    return (
        <Modal visible={props.ModalVisible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
            <Title>Settings</Title>
            <Text>Here you can customize the volumes of the water cup and bottle
                to match your own to make adding water quick and easy.</Text>

            <TextInput
                label="Volume of your water cup"
                placeholder="in millilitres"
                underlineColor="#2176FF"
                onChangeText={text => updateWaterCup(text)}
            />
            <TextInput
                label="Volume of your water cup"
                placeholder="in millilitres"
                underlineColor="#2176FF"
                onChangeText={text => updateWaterBottle(text)}
            />
        </Modal>
    )
}