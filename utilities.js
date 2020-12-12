import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return 100 * (current / target)
}

export function today() {
    return DateTime.local().toSQLDate();
}

export function splitObj(chartData){
    console.log("Original data" + chartData)
    let validKeys = [],
        data = [],
        keys = [],
        vals = [];
    for (const l in data) {
        if (data.hasOwnProperty(l)) {
                keys.push(l);
                vals.push(data[l]);
                console.log("Keys: " + keys);
                validKeys = keys.filter(key => { return  key !== "undefined"})
                console.log("Valid keys: " + validKeys);
                data = vals.filter(val => { return val != null || undefined })
        }
    }
    console.log({labels: validKeys, datasets:[{data}]})
    return {labels: validKeys, datasets:[{data}]};
}