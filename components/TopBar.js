import * as React from 'react';
import {Appbar, Divider, Menu, Portal} from 'react-native-paper';
import * as firebase from "firebase";
import {today} from "../utilities";
import SettingsDialog from "./SettingsDialog";

export default function TopBar() {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [isDialogVisible, setIsDialogVisible] = React.useState(false);
    const showDialog = () => setIsDialogVisible(true);
    const hideDialog = () => setIsDialogVisible(false);

    const resetWater = () => {
        firebase.database().ref('users/001/' + today() + '/').update(
            {'waterAmount': 0, 'date': today(), 'percentage': 0}
        ).then(() => null);
    }

    return (
        <Appbar.Header>
            <Appbar.Action style={{flex: 0}} onPress={() => {}} />
            <Appbar.Content style={{alignItems: 'center'}} title="Water Intake Tracker"/>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action style={{flex: 0}} color="#FFFFFF" icon="dots-vertical" onPress={() => {openMenu()}} />}>
                <Menu.Item onPress={() => {resetWater(); closeMenu();}} title="Reset water intake" />
                <Divider />
                <Menu.Item onPress={() => {showDialog(); closeMenu();}} title="Settings" />
            </Menu>
            <Portal>
                <SettingsDialog
                    isDialogVisible={isDialogVisible}
                    setIsDialogVisible={setIsDialogVisible}
                    hideDialog={hideDialog}
                />
            </Portal>
        </Appbar.Header>
    );
};
