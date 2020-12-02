import React from 'react';
import { Provider, Portal, Dialog, Button, Text, TextInput } from "react-native-paper";
import View from "react-native";

export default function ChangeTargetDialog(props) {

    const [inputVal, setInputVal] = React.useState('test');

    return (
        <Provider>
                <Portal>
                    <Dialog
                        visible={props.isDialogVisible}
                        onDismiss={() => props.setIsDialogVisible(false)}>
                        <Dialog.Title>Set water target (millilitres)</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                value={props.target}
                                onChangeText={text => setInputVal(text)}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {
                                props.setIsDialogVisible(false);
                                props.setTarget(parseInt(inputVal));
                            }}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
        </Provider>
    );
}