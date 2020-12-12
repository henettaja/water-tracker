import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return 100 * (current / target)
}

export function today() {
    return DateTime.local().toSQLDate();
}

export function splitObj(chartData){
    let data = [],
        keys = [];

    // Keys and values into two separate arrays
    for (const l in chartData)
        if (chartData.hasOwnProperty(l)) {
            if (l !== "undefined" && chartData[l] !== null) {
                keys.push(l);
                data.push(chartData[l]);
            }
        }
    return {labels: keys, datasets:[{data}]};
}