const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List all Locations currently available in a user account.
 * @param {type} authToken - OAuth token
 * @returns List of all Locations
 */
function locationsList(authToken) {
    return rp(requests.request(authToken, `locations`, 'GET'));
}

/**
 * Create a Location for a user.
 * @param {type} authToken - OAuth token
 * @param {type} name - string [ 1 .. 40 ] characters
 * @param {type} countryCode - string
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
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
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @returns A specific Location data
 */
function locationData(authToken, locationId) {
    return rp(requests.request(authToken, `locations/${locationId}`, 'GET'));
}

/**
 * Update a specific Location.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @param {type} name - string [ 1 .. 40 ] characters 
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
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
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @returns {unresolved}
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
