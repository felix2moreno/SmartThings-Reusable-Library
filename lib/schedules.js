const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List the schedules for the installed app.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @returns {List<Object>}
 */
function schedulesList(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'GET'));
}

/**
 * Create a Once schedule for an installed app. 
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {string} name - The unique per installed app name of the schedule. 
 * @param {integer} minutes - The time in minutes for ONCE schedules.
 * @param {boolean} overwrite - Overwrite.
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
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {string} name - The unique per installed app name of the schedule.
 * @param {string} expression - The cron expression for the schedule for CRON schedules.
 * @param {string} timezone - The timezone id for CRON schedules.
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
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 */
function deleteSchedules(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules`, 'DELETE'));
}

/**
 * Get a specific schedule for the installed app.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {string} scheduleName - The name of the schedule.
 * @returns [Object}
 */
function installedappSchedule(authToken, installedAppId, scheduleName) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/schedules/${scheduleName}`, 'GET'));
}

/**
 * Delete a specific schedule for the installed app.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {string} scheduleName - The name of the schedule.
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
