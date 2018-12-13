'use strict';

let moment = require('moment');

function currentTimeStamp() {
    // let now = moment().subtract(3, 'hours');
    let now = moment().subtract(2, 'hours');
    let years = now.format('YYYY-MM-DD');
    let timestamp = now.format('HH:mm:ss');
    return years + 'T' + timestamp + 'Z';
}

function currentStampMinusTime(minus, type) {
    // let now = moment().subtract(3, 'hours').subtract(minus, type);
    let now = moment().subtract(2, 'hours').subtract(minus, type);
    let years = now.format('YYYY-MM-DD');
    let timestamp = now.format('HH:mm:ss');
    return years + 'T' + timestamp + 'Z';
}

module.exports.currentTimeStemp = currentTimeStamp;
module.exports.currentStampMinusTime = currentStampMinusTime;

