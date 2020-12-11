import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Text, Surface} from "react-native-paper";
import * as firebase from "firebase";
import {LineChart} from "react-native-chart-kit";
import {splitObj} from "../utilities";

const screenWidth = Dimensions.get("window").width;

export default function DateData(props) {

    const [data, setData] = React.useState();
    const [chartData, setChartData] = React.useState();

    const mockdata = {
        labels: ["2020-12-08", "2020-12-09", "2020-12-11"],
        datasets: [
            {
                data: [0, 1320, 330],
            }
        ],
        legend: ["Water intake"] // optional
    };

    console.log(props.date)

    React.useEffect(() => {
        firebase.database().ref('users/001/' + props.date + '/').on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const prods = Object.values(data);
                console.log(prods)
                setData(prods[2]);
            } else {
                console.log("No data")
                setData(null);
            }
        })
    }, );

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
            </Surface>
            <LineChart
                data={mockdata}
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