const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List the subscriptions for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @returns List of subscriptions
 */
function subscriptionsList(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'GET'));
}

/**
 * Create a Device subscription to a type of event. 
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} deviceId - The GUID of the device that is subscribed to
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createDeviceSubscriptions(authToken, installedAppId, deviceId, args) {
    let body = {};
    body.sourceType = "DEVICE";
    body.device = {};
    body.device.deviceId = deviceId;
    if (args) {
        if (args.get("componentId"))
            body.device.componentId = args.get("componentId");
        if (args.get("capability"))
            body.device.capability = args.get("capability");
        if (args.get("attrribute"))
            body.device.attrribute = args.get("attrribute");
        if (args.get("value"))
            body.device.value = args.get("value");
        if (args.get("stateChangeOnly"))
            body.device.stateChangeOnly = args.get("stateChangeOnly");
        if (args.get("subscriptionName"))
            body.device.subscriptionName = args.get("subscriptionName");
        if (args.get("modes"))
            body.device.modes = args.get("modes");
    }
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Capability subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} locationId - The id of the location that both the app and source device are in
 * @param {type} capability - String Name of the capability that is subscribed to
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createCapabilitySubscriptions(authToken, installedAppId, locationId, capability, args) {
    let body = {};
    body.sourceType = "CAPABILITY";
    body.capability = {};
    body.capability.locationId = locationId;
    body.capability.capability = capability;
    if (args) {
        if (args.get("attrribute"))
            body.capability.attrribute = args.get("attrribute");
        if (args.get("value"))
            body.capability.value = args.get("value");
        if (args.get("stateChangeOnly"))
            body.capability.stateChangeOnly = args.get("stateChangeOnly");
        if (args.get("subscriptionName"))
            body.capability.subscriptionName = args.get("subscriptionName");
        if (args.get("modes"))
            body.capability.modes = args.get("modes");
    }
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Mode subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} locationId - The GUID for the location to subscribe to mode changes
 * @returns {unresolved}
 */
function createModeSubscriptions(authToken, installedAppId, locationId) {
    let body = {};
    body.sourceType = "MODE";
    body.mode = {};
    body.mode.locationId = locationId;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Device Lifecycle subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createDeviceLifecycleSubscriptions(authToken, installedAppId, args) {
    let body = {};
    body.sourceType = "DEVICE_LIFECYCLE";
    if (args) {
        body.deviceLifecycle = {};
        if (args.get("deviceIds"))
            body.deviceLifecycle.deviceIds = args.get("deviceIds");
        if (args.get("subscriptionName"))
            body.deviceLifecycle.subscriptionName = args.get("subscriptionName");
        if (args.get("locationId"))
            body.deviceLifecycle.locationId = args.get("locationId");
    }
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Device Health subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createDeviceHealthSubscriptions(authToken, installedAppId, args) {
    let body = {};
    body.sourceType = "DEVICE_HEALTH";
    if (args) {
        body.deviceHealth = {};
        if (args.get("deviceIds"))
            body.deviceHealth.deviceIds = args.get("deviceIds");
        if (args.get("subscriptionName"))
            body.deviceHealth.subscriptionName = args.get("subscriptionName");
        if (args.get("locationId"))
            body.deviceHealth.locationId = args.get("locationId");
    }
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Security Arm State subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} locationId - The id of the location that both the app and the security system are in
 * @param {type} subscriptionName - A name for the subscription that will be passed to the installed app
 * @returns {unresolved}
 */
function createSecurityArmStateSubscriptions(authToken, installedAppId, locationId, subscriptionName) {
    let body = {};
    body.sourceType = "SECURITY_ARM_STATE";
    body.securityArmState = {};
    body.securityArmState.locationId = locationId;
    if (subscriptionName)
        body.securityArmState.subscriptionName = subscriptionName;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Hub Health subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} locationId - The id of the location that both the app and the security system are in
 * @param {type} subscriptionName - A name for the subscription that will be passed to the installed app
 * @returns {unresolved}
 */
function createHubHealthSubscriptions(authToken, installedAppId, locationId, subscriptionName) {
    let body = {};
    body.sourceType = "HUB_HEALTH";
    body.hubHealth = {};
    body.hubHealth.locationId = locationId;
    if (subscriptionName)
        body.hubHealth.subscriptionName = subscriptionName;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Create a Scene Lifecycle subscription to a type of event.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} locationId - The id of the location that both the app and the security system are in
 * @param {type} subscriptionName - A name for the subscription that will be passed to the installed app
 * @returns {unresolved}
 */
function createSceneLifecycleSubscriptions(authToken, installedAppId, locationId, subscriptionName) {
    let body = {};
    body.sourceType = "SCENE_LIFECYCLE";
    body.sceneLifecycle = {};
    body.sceneLifecycle.locationId = locationId;
    if (subscriptionName)
        body.sceneLifecycle.subscriptionName = subscriptionName;
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'POST', body));
}

/**
 * Delete all subscriptions for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @returns {unresolved}
 */
function deleteSubscriptions(authToken, installedAppId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions`, 'DELETE'));
}

/**
 * Get a specific subscription for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} subscriptionId - The ID of the subscription
 * @returns Installed app subscription
 */
function installedappSubscriptions(authToken, installedAppId, subscriptionId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions/${subscriptionId}`, 'GET'));
}

/**
 * Delete a specific subscription for the installed app.
 * @param {type} authToken - OAuth token
 * @param {type} installedAppId - The ID of the installed application
 * @param {type} subscriptionId - The ID of the subscription
 * @returns {unresolved}
 */
function deleteInstalledappSubscriptions(authToken, installedAppId, subscriptionId) {
    return rp(requests.request(authToken, `installedapps/${installedAppId}/subscriptions/${subscriptionId}`, 'DELETE'));
}

module.exports = {
    subscriptionsList: subscriptionsList,
    createDeviceSubscriptions: createDeviceSubscriptions,
    createCapabilitySubscriptions: createCapabilitySubscriptions,
    createModeSubscriptions: createModeSubscriptions,
    createDeviceLifecycleSubscriptions: createDeviceLifecycleSubscriptions,
    createDeviceHealthSubscriptions: createDeviceHealthSubscriptions,
    createSecurityArmStateSubscriptions: createSecurityArmStateSubscriptions,
    createHubHealthSubscriptions: createHubHealthSubscriptions,
    createSceneLifecycleSubscriptions: createSceneLifecycleSubscriptions,
    deleteSubscriptions: deleteSubscriptions,
    installedappSubscriptions: installedappSubscriptions,
    deleteInstalledappSubscriptions: deleteInstalledappSubscriptions
};
