import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return 100 * (current / target)
}

export function today() {
    return DateTime.local().toSQLDate();
}

export function splitObj(data){
    console.log(data)
    var keys = [],
        vals = [];
    for (const l in data) {
        if (data.hasOwnProperty(l)) {
            if (l != undefined) {
                keys.push(l);
                vals.push(data[l]);
            }
        }
    }
    console.log({labels: keys, datasets:[{vals}], legend: ["Water intake"]})
    return {labels: keys, datasets:[{vals}], legend: ["Water intake"]};
}