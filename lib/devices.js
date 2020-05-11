const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Get a list of devices.
 * @param {type} authToken - OAuth token
 * @returns List of devices
 */
function devicesList(authToken) {
    return rp(requests.request(authToken, `devices`, 'GET'));
}

/**
 * Install a device.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the Location with which the device is associated
 * @param {type} profileId - The device profile Id
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function installDevice(authToken, locationId, profileId, installedAppId, args) {
    let body = {};
    body.locationId = locationId;
    body.app = {};
    body.app.profileId = profileId;
    body.app.installedAppId = installedAppId;
    if (args) {
        if (args.get("label"))
            body.label = args.get("label");
        if (args.get("externalId"))
            body.app.externalId = args.get("externalId");
    }
    return rp(requests.request(authToken, `devices`, 'POST', body));
}

/**
 * Get a device's description.
 * @param {type} authToken - - OAuth token
 * @param {type} deviceId - the device ID
 * @returns Device's description
 */
function deviceDescription(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}`, 'GET'));
}

/**
 * Delete a device by device id. 
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @returns {unresolved}
 */
function deleteDevice(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}`, 'DELETE'));
}

/**
 * Update the properties of a device.
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @param {type} label - string [ 1 .. 255 ] characters 
 * @param {type} components - Array of object
 * @returns {unresolved}
 */
function updateDevice(authToken, deviceId, label, components) {
    let body = {};
    body.label = label;
    body.components = components;
    return rp(requests.request(authToken, `devices/${deviceId}`, 'PUT', body));
}

/**
 * Execute commands on a device.
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @param {type} commands - An array of commands to execute on the Device.
 * @returns {unresolved}
 */
function executeCommand(authToken, deviceId, commands) {
    let body = {};
    body.commands = commands;
    return rp(requests.request(authToken, `devices/${deviceId}/commands`, 'POST', commands));
}

/**
 * Create events for a device.
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @param {type} deviceEvents - An array of attribute state updates
 * @returns {unresolved}
 */
function createEvent(authToken, deviceId, deviceEvents) {
    let body = {};
    body.deviceEvents = deviceEvents;
    return rp(requests.request(authToken, `devices/${deviceId}/events`, 'POST', body));
}

/**
 * Get the current status of all of a device's component's attributes.
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @returns Device status
 */
function deviceStatus(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}/status`, 'GET'));
}

/**
 * Get the status of all attributes of a the component. 
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @param {type} componentId - The name of the component
 * @returns Component status
 */
function componentStatus(authToken, deviceId, componentId) {
    return rp(requests.request(authToken, `devices/${deviceId}/components/${componentId}/status`, 'GET'));
}

/**
 * Get the current status of a device component's capability. 
 * @param {type} authToken - OAuth token
 * @param {type} deviceId - the device ID
 * @param {type} componentId - The name of the component
 * @param {type} capabilityId - The ID of the capability
 * @returns Capability status
 */
function capabilityStatus(authToken, deviceId, componentId, capabilityId) {
    return rp(requests.request(authToken, `devices/${deviceId}/components/${componentId}/capabilities/${capabilityId}/status`, 'GET'));
}

module.exports = {
    devicesList: devicesList,
    installDevice: installDevice,
    deviceDescription: deviceDescription,
    deleteDevice: deleteDevice,
    updateDevice: updateDevice,
    executeCommand: executeCommand,
    createEvent: createEvent,
    deviceStatus: deviceStatus,
    componentStatus: componentStatus,
    capabilityStatus: capabilityStatus
};