const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List the schedules for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @returns List of Schedules
 */
function schedulesList(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'GET'));
}

/**
 * Create a Once schedule for an installed app. 
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} name - string <^[A-Za-z0-9._\-]{1,36}$> [ 1 .. 36 ] characters 
 * @param {type} minutes
 * @param {type} overwrite - boolean
 * @returns {unresolved}
 */
function saveOnceSchedule(authToken, installedAppId, name, minutes, overwrite) {
    const time = new Date().getTime() + (minutes * 60 * 1000);
    let body = {};
    body.name = name;
    body.once = {};
    body.once.time = time;
    if (overwrite)
        body.once.overwrite = overwrite;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body));
}

/**
 * Create a Cron schedule for an installed app. 
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} name - string <^[A-Za-z0-9._\-]{1,36}$> [ 1 .. 36 ] characters 
 * @param {type} expression - string <= 256 characters 
 * @param {type} timezone - String The timezone id for CRON schedules
 * @returns {unresolved}
 */
function saveCronSchedule(authToken, installedAppId, name, expression, timezone) {
    let body = {};
    body.name = name;
    body.cron = {};
    body.cron.expression = expression;
    body.cron.timezone = timezone;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'POST', body));
}

/**
 * Delete all schedules for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @returns {unresolved}
 */
function deleteSchedules(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'DELETE'));
}

/**
 * Get a specific schedule for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} scheduleName - The name of the schedule
 * @returns Installed app Schedule
 */
function installedappSchedule(authToken, installedAppId, scheduleName) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'GET'));
}

/**
 * Delete a specific schedule for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} scheduleName - The name of the schedule
 * @returns {unresolved}
 */
function deleteSchedule(authToken, installedAppId, scheduleName) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'DELETE'));
}

module.exports = {
    schedulesList: schedulesList,
    saveOnceSchedule: saveOnceSchedule,
    saveCronSchedule: saveCronSchedule,
    deleteSchedules: deleteSchedules,
    installedappSchedule: installedappSchedule,
    deleteSchedule: deleteSchedule
};
