import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return Math.floor(100 * (current / target));
}

export function today() {
    return DateTime.local().toSQLDate();
}

export function splitObj(chartData){
    let alldata = [],
        allkeys = [];

    // Keys and values into two separate arrays
    for (const l in chartData) {
        if (chartData.hasOwnProperty(l)) {
            if (l !== "undefined" && chartData[l] !== null) {
                const parsedKey = DateTime.fromSQL(l).weekdayShort;
                allkeys.push(parsedKey);
                alldata.push(chartData[l]);
            }
        }
    }
    const keys = allkeys.slice(Math.max(allkeys.length-7, 0))
    const data = alldata.slice(Math.max(alldata.length-7, 0))

    return {labels: keys, datasets:[{data}]};
}