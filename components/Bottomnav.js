import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MainScreen from "./MainScreen";
import HistoryScreen from "./HistoryScreen";

const HistoryRoute = () => <Text>History</Text>;

const SettingsRoute = () => <Text>Settings</Text>;

const Bottomnav = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'main', title: 'Main', icon: 'home' },
        { key: 'history', title: 'History', icon: 'chart-bell-curve' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        main: MainScreen,
        history: HistoryScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
        />
    );
};

export default Bottomnav;