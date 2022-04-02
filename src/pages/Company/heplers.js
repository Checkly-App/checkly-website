import _, { groupBy } from 'lodash';
import moment from 'moment';

export const calculateTimeline = (companyAbscences, companyAttendance, formatString, type) => {
    let abscences = groupBy(companyAbscences, (dt) => moment(dt).format(formatString));
    let attendance = groupBy(companyAttendance, (dt) => moment(dt['date']).format(formatString));

    let keysAttendance = Object.keys(attendance);
    let keysAbscence = Object.keys(abscences);

    let data = [];

    let keys = keysAttendance.concat(keysAbscence);
    keys = keys.filter((item, index) => {
        return (keys.indexOf(item) == index)
    });

    keys.sort((a, b) => {
        var start = new Date(a),
            end = new Date(b);

        if (start !== end) {
            if (start > end) { return 1; }
            if (start < end) { return -1; }
        }
        return start - end;
    });

    if (type === 'daily' && keys.length > 7)
        keys = keys.slice(-7)
    if (type === 'monthly' && keys.length > 12)
        keys = keys.slice(-12)
    if (type === 'weekly' && keys.length > 8)
        keys = keys.slice(-8)
    if (type === 'yearly' && keys.length > 5)
        keys = keys.slice(-5)

    for (let i = 0; i < keys.length; i++) {
        const group = keys[i];
        const object = {
            name: `${group}`,
            Abscence: group in abscences ? abscences[group].length : 0,
            Attendance: group in attendance ? attendance[group].length : 0,
        }

        data.push(object);
    }

    return data;
}