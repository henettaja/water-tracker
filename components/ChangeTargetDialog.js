import React from 'react';
import { Provider, Portal, Dialog, Button, TextInput } from "react-native-paper";

export default function ChangeTargetDialog(props) {

    const [inputVal, setInputVal] = React.useState(NaN);

    return (
        <Provider>
            <Portal>
                <Dialog
                    visible={props.isDialogVisible}
                    onDismiss={() => props.setIsDialogVisible(false)}>
                    <Dialog.Title>Water target</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Set water target"
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
                                if (!isNaN(inputVal)) props.setTarget(parseInt(inputVal));
                            }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
}