const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List all installed applications within the specified locations.
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>}
 */
function installedappsList(authToken) {
    return rp(requests.request(authToken, `installedapps`, 'GET'));
}

/**
 * Fetch a single installed application.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @returns {Object}
 */
function installedappDescription(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}`, 'GET'));
}

/**
 * Delete an Installed App.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 */
function deleteInstalledapp(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}`, 'DELETE'));
}

/**
 * List all configurations potentially filtered by status for an installed app.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @returns {List<Object>}
 */
function configurationsList(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/configs`, 'GET'));
}

/**
 * Fetch a detailed install configuration model containing actual config entries / values.
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {string} configurationId - The ID of the install configuration.
 * @returns {Object}
 */
function installedappConfiguration(authToken, installedAppId, configurationId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/configs/${configurationId}`, 'GET'));
}

/**
 * Create events for an installed app. 
 * @param {string} authToken - OAuth token.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {Map} args - Not required arguments.
 */
function createInstalledappEvents(authToken, installedAppId, args) {
    let body = {};
    if (args) {
        if (args.get("smartAppEvents"))
            body.smartAppEvents = args.get("smartAppEvents");
        if (args.get("smartAppDashboardCardEvents"))
            body.smartAppDashboardCardEvents = args.get("smartAppDashboardCardEvents");
        return rp(requests.request(authToken, `installedapps/${installedAppId}/events`, 'POST', body));
    }
}

module.exports = {
    installedappsList: installedappsList,
    installedappDescription: installedappDescription,
    deleteInstalledapp: deleteInstalledapp,
    configurationsList: configurationsList,
    installedappConfiguration: installedappConfiguration,
    createInstalledappEvents: createInstalledappEvents
}
;




