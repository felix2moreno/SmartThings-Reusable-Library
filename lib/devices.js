const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Get a list of devices.
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>}
 */
function devicesList(authToken) {
    return rp(requests.request(authToken, `devices`, 'GET'));
}

/**
 * Install a device.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the Location with which the device is associated.
 * @param {string} profileId - The device profile Id.
 * @param {string} installedAppId - The ID of the installed application.
 * @param {Map} args - Not required arguments.
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
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @returns {Object}
 */
function deviceDescription(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}`, 'GET'));
}

/**
 * Delete a device by device id. 
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 */
function deleteDevice(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}`, 'DELETE'));
}

/**
 * Update the properties of a device.
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @param {string} label - The label for the device.
 * @param {Array<Object>} components - Device components.
 */
function updateDevice(authToken, deviceId, label, components) {
    let body = {};
    body.label = label;
    body.components = components;
    return rp(requests.request(authToken, `devices/${deviceId}`, 'PUT', body));
}

/**
 * Execute commands on a device.
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @param {Array<Object>} commands - An array of commands to execute on the Device.
 */
function executeCommand(authToken, deviceId, commands) {
    let body = {};
    body.commands = commands;
    return rp(requests.request(authToken, `devices/${deviceId}/commands`, 'POST', commands));
}

/**
 * Create events for a device.
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @param {Array<Object>} deviceEvents - An array of attribute state updates.
 */
function createEvent(authToken, deviceId, deviceEvents) {
    let body = {};
    body.deviceEvents = deviceEvents;
    return rp(requests.request(authToken, `devices/${deviceId}/events`, 'POST', body));
}

/**
 * Get the current status of all of a device's component's attributes.
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @returns {Object}
 */
function deviceStatus(authToken, deviceId) {
    return rp(requests.request(authToken, `devices/${deviceId}/status`, 'GET'));
}

/**
 * Get the status of all attributes of a the component. 
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @param {string} componentId - The name of the component.
 * @returns {Object}
 */
function componentStatus(authToken, deviceId, componentId) {
    return rp(requests.request(authToken, `devices/${deviceId}/components/${componentId}/status`, 'GET'));
}

/**
 * Get the current status of a device component's capability. 
 * @param {string} authToken - OAuth token.
 * @param {string} deviceId - the device ID.
 * @param {string} componentId - The name of the component.
 * @param {string} capabilityId - The ID of the capability.
 * @returns {Object}
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