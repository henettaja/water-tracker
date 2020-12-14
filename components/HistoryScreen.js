import React from 'react';
import * as firebase from "firebase";
import {Dimensions, StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {CalendarList} from "react-native-calendars";
import { today} from "../utilities";
import DateData from "./DateData";

export default function HistoryScreen() {

    const [marked, setMarked] = React.useState({});
    const [waterObject, setWaterObject] = React.useState({});
    const [selected, setSelected] = React.useState(null);

    // Currently breaks the app
    React.useEffect(() => {
        firebase.database().ref('users/001/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            const markedData = prods.reduce((obj, item) => ({...obj, [item.date]: {selected: true}}) ,{});
            const waterData = prods.reduce((obj, item) => ({...obj, [item.date]: item.waterAmount}) ,{});
            setMarked(markedData);
            setWaterObject(waterData);
        })
    }, []);

    return (
        <View style={styles.container}>
            <Title>Water intake history</Title>
            <View style={styles.calendar}>
                <CalendarList
                    theme={{
                        calendarBackground: '#131A26',
                        textSectionTitleColor: '#ffffff',
                        selectedDayTextColor: '#ffffff',
                        selectedDayBackgroundColor: '#2176FF',
                        dayTextColor: '#ffffff',
                        monthTextColor: '#ffffff',
                        textMonthFontWeight: 'bold',
                    }}
                    firstDay={1}
                    horizontal={true}
                    pagingEnabled={true}
                    onDayPress={(day) => {
                        if (!(waterObject.hasOwnProperty(day['dateString']))) {
                            setSelected(null);
                        } else {
                            setSelected(day["dateString"])
                            console.log(waterObject);
                        }
                    }}
                    markedDates={{...marked, [today()]: {selected: true, selectedColor: '#81c5fe'}}}
                />
            </View>
            <View style={styles.content}>
                <DateData
                    date={selected}
                    chartData={waterObject}
                />
            </View>
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
    calendar: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
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