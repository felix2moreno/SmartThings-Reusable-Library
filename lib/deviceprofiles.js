const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Create a device profile.
 * @param {type} authToken - OAuth token
 * @param {type} name - string <^(?!\s)[-_!.~'() *0-9a-zA-Z\p{L}]{1,100}(?<!\s)$> [ 1 .. 100 ] characters 
 * @param {type} components - A list of components for this profile. 
 * @param {type} metadata - Additional information about the device profile, limited to 10 entries.
 * @returns {unresolved}
 */
function createDeviceprofile(authToken, name, components, metadata) {
    let body = {};
    body.name = name;
    body.components = components;
    if (metadata)
        body.metadata = metadata;
    return rp(requests.request(authToken, `deviceprofiles`, 'POST', body));
}

/**
 * List device profiles.
 * @param {type} authToken - OAuth token
 * @returns List of device profiles
 */
function deviceprofilesList(authToken) {
    return rp(requests.request(authToken, `deviceprofiles`, 'GET'));
}

/**
 * GET a device profile.
 * @param {type} authToken - OAuth token
 * @param {type} deviceProfileId - the device profile ID
 * @returns Device profile data
 */
function deviceprofileData(authToken, deviceProfileId) {
    return rp(requests.request(authToken, `deviceprofiles/${deviceProfileId}`, 'GET'));
}

/**
 * Delete a device profile by ID. 
 * @param {type} authToken - OAuth token
 * @param {type} deviceProfileId - the device profile ID
 * @returns {unresolved}
 */
function deleteDeviceprofile(authToken, deviceProfileId) {
    return rp(requests.request(authToken, `deviceprofiles/${deviceProfileId}`, 'DELETE'));
}

/**
 * Update a device profile. 
 * @param {type} authToken - OAuth token
 * @param {type} deviceProfileId - the device profile ID
 * @param {type} components - A list of components for this profile. 
 * @param {type} metadata - Additional information about the device profile, limited to 10 entries.
 * @returns {unresolved}
 */
function updateDeviceprofile(authToken, deviceProfileId, components, metadata) {
    let body = {};
    body.components = components;
    if (metadata)
        body.metadata = metadata;
    return rp(requests.request(authToken, `deviceprofiles/${deviceProfileId}`, 'PUT', body));
}

module.exports = {
    createDeviceprofile: createDeviceprofile,
    deviceprofilesList: deviceprofilesList,
    deviceprofileData: deviceprofileData,
    deleteDeviceprofile: deleteDeviceprofile,
    updateDeviceprofile: updateDeviceprofile
};





