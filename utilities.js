import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return 100 * (current / target)
}

export function today() {
    return DateTime.local().toSQLDate();
}