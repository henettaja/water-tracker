import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Text, Surface} from "react-native-paper";
import * as firebase from "firebase";
import {LineChart} from "react-native-chart-kit";
import {splitObj, today} from "../utilities";

const screenWidth = Dimensions.get("window").width;

export default function DateData(props) {

    // Prop for selected day's data
    const [data, setData] = React.useState("");
    // Prop for line chart's data
    const [chartData, setChartData] = React.useState({datasets: [{data: [0]}], labels: [today()]});

    React.useEffect(() => {
        firebase.database().ref('users/001/' + props.date + '/').on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const prods = Object.values(data);
                setData(prods[2]);
            } else {
                setData(null);
            }
        })

        // Split waterData from HistoryScreen to a suitable format for line chart
        setChartData(splitObj(props.chartData));
    }, [props.date, props.chartData]);

    const chartConfig = {
        backgroundColor: "#131A26",
        backgroundGradientFrom: "#131A26",
        backgroundGradientTo: "#131A26",
        fillShadowGradient: "#2176FF",
        fillShadowGradientOpacity: "0.2",
        color: (opacity = 1) => `rgba(33, 118, 255, ${opacity})`, // optional
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "5",
            strokeWidth: "3",
            stroke: "#FFFFFF"
        },
        barPercentage: 0.5,
    };

    return (
        <View>
            <Surface style={styles.surface}>
                {data !== null &&
                <Text>Water intake: {data} ml</Text>
                }
                {data === null &&
                <Text>Select a valid date</Text>
                }
            </Surface>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        padding: 10,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    graph: {
        flex: 1,
        width: screenWidth,
    }
});