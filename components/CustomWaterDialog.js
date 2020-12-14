import React from 'react';
import { Provider, Portal, Dialog, Button, Text, TextInput } from "react-native-paper";
import View from "react-native";

export default function CustomWaterDialog(props) {

    const [inputVal, setInputVal] = React.useState('0');

    return (
        <Provider>
            <Portal>
                <Dialog
                    visible={props.isDialogVisible}
                    onDismiss={() => props.setIsDialogVisible(false)}>
                    <Dialog.Title>Water intake</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Amount of water to add"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            theme={{colors: {primary: '#2176FF'}}}
                            onChangeText={text => setInputVal(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            theme={{colors: {primary: '#2176FF'}}}
                            onPress={() => {
                            props.setIsDialogVisible(false);
                            props.addWater(parseInt(inputVal));
                        }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
}