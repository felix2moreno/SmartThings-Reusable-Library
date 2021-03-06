const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List all Locations currently available in a user account.
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>}
 */
function locationsList(authToken) {
    return rp(requests.request(authToken, `locations`, 'GET'));
}

/**
 * Create a Location for a user.
 * @param {string} authToken - OAuth token.
 * @param {string} name - A nickname given for the location.
 * @param {string} countryCode - An ISO Alpha-3 country code.
 * @param {Map} args - Not required arguments.
 */
function createLocation(authToken, name, countryCode, args) {
    let body = {};
    body.name = name;
    body.countryCode = countryCode;
    if (args) {
        if (args.get("latitude"))
            body.latitude = args.get("latitude");
        if (args.get("longitude"))
            body.longitude = args.get("longitude");
        if (args.get("regionRadius"))
            body.regionRadius = args.get("regionRadius");
        if (args.get("temperatureScale"))
            body.temperatureScale = args.get("temperatureScale");
        if (args.get("locale"))
            body.locale = args.get("locale");
    }
    return rp(requests.request(authToken, `locations`, 'POST', body));
}

/**
 * Get a specific Location from a user's account.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @returns {Object}
 */
function locationData(authToken, locationId) {
    return rp(requests.request(authToken, `locations/${locationId}`, 'GET'));
}

/**
 * Update a specific Location.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @param {string} name - A nickname for the location.
 * @param {Map} args - Not required arguments.
 */
function updateLocation(authToken, locationId, name, args) {
    let body = {};
    body.name = name;
    if (args) {
        if (args.get("latitude"))
            body.latitude = args.get("latitude");
        if (args.get("longitude"))
            body.longitude = args.get("longitude");
        if (args.get("regionRadius"))
            body.regionRadius = args.get("regionRadius");
        if (args.get("temperatureScale"))
            body.temperatureScale = args.get("temperatureScale");
        if (args.get("locale"))
            body.locale = args.get("locale");
    }
    return rp(requests.request(authToken, `locations/${locationId}`, 'PUT', body));
}

/**
 * Delete a Location from a user's account.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 */
function deleteLocation(authToken, locationId) {
    return rp(requests.request(authToken, `locations/${locationId}`, 'DELETE'));
}

module.exports = {
    locationsList: locationsList,
    createLocation: createLocation,
    locationData: locationData,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
};
