const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Create a WebHook App integration
 * @param {type} authToken - OAuth token
 * @param {type} appName - string <^[a-z0-9.-_]{1,250}$>
 * @param {type} displayName - string <= 75 characters 
 * @param {type} description - string <= 250 characters 
 * @param {type} classifications - Array of AppClassification (string)
 * @param {type} targetUrl - A URL that should be invoked during execution
 * @param {type} dashboardCardsEnabled - boolean 
 * @param {type} preInstallDashboardCardsEnabled - boolean 
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createWebHookApp(authToken, appName, displayName, description, classifications, targetUrl, dashboardCardsEnabled, preInstallDashboardCardsEnabled, args) {
    let body = {};
    body.appName = appName;
    body.displayName = displayName;
    body.description = description;
    body.appType = 'WEBHOOK_SMART_APP';
    body.classifications = classifications;
    body.webhookSmartApp = {};
    body.webhookSmartApp.targetUrl = targetUrl;
    body.ui = {};
    body.ui.dashboardCardsEnabled = dashboardCardsEnabled;
    body.ui.preInstallDashboardCardsEnabled = preInstallDashboardCardsEnabled;
    body.iconImage = {};
    body.oauth = {};
    if (args) {
        if (args.get("singleInstance"))
            body.singleInstance = args.get("singleInstance");
        if (args.get("url"))
            body.iconImage.url = args.get("url");
        if (args.get("principalType"))
            body.principalType = args.get("principalType");
        if (args.get("clientName"))
            body.oauth.clientName = args.get("clientName");
        if (args.get("scope"))
            body.oauth.scope = args.get("scope");
        if (args.get("redirectUris"))
            body.oauth.redirectUris = args.get("redirectUris");
        if (args.get("pluginId"))
            body.ui.pluginId = args.get("pluginId");
        if (args.get("pluginUri"))
            body.ui.pluginUri = args.get("pluginUri");
    }
    return rp(requests.request(authToken, `apps`, 'POST', body));
}

/**
 * Create a WebHook App integration
 * @param {type} authToken - OAuth token
 * @param {type} appName - string <^[a-z0-9.-_]{1,250}$>
 * @param {type} displayName - string <= 75 characters 
 * @param {type} description - string <= 250 characters 
 * @param {type} classifications - Array of AppClassification (string)
 * @param {type} functions - Array of String
 * @param {type} dashboardCardsEnabled - boolean 
 * @param {type} preInstallDashboardCardsEnabled - boolean 
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function createLambdaApp(authToken, appName, displayName, description, classifications, functions, dashboardCardsEnabled, preInstallDashboardCardsEnabled, args) {
    let body = {};
    body.appName = appName;
    body.displayName = displayName;
    body.description = description;
    body.appType = 'LAMBDA_SMART_APP';
    body.classifications = classifications;
    body.lambdaSmartApp = {};
    body.lambdaSmartApp.functions = functions;
    body.ui = {};
    body.ui.dashboardCardsEnabled = dashboardCardsEnabled;
    body.ui.preInstallDashboardCardsEnabled = preInstallDashboardCardsEnabled;
    body.iconImage = {};
    body.oauth = {};
    if (args) {
        if (args.get("singleInstance"))
            body.singleInstance = args.get("singleInstance");
        if (args.get("url"))
            body.iconImage.url = args.get("url");
        if (args.get("principalType"))
            body.principalType = args.get("principalType");
        if (args.get("clientName"))
            body.oauth.clientName = args.get("clientName");
        if (args.get("scope"))
            body.oauth.scope = args.get("scope");
        if (args.get("redirectUris"))
            body.oauth.redirectUris = args.get("redirectUris");
        if (args.get("pluginId"))
            body.ui.pluginId = args.get("pluginId");
        if (args.get("pluginUri"))
            body.ui.pluginUri = args.get("pluginUri");
    }
    return rp(requests.request(authToken, `apps`, 'POST', body));
}

/**
 * List all apps configured in an account.
 * @param {type} authToken - OAuth token
 * @returns List of apps
 */
function appsList(authToken) {
    return rp(requests.request(authToken, `apps`, 'GET'));
}

/**
 * Get a single app.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - String The appName or appId field of an app
 * @returns App description
 */
function appDescription(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'GET'));
}

/**
 * Update a WebHook App integration
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - String The appName or appId field of an app
 * @param {type} displayName - string <= 75 characters 
 * @param {type} description - string <= 250 characters 
 * @param {type} classifications - Array of AppClassification (string)
 * @param {type} targetUrl - A URL that should be invoked during execution
 * @param {type} dashboardCardsEnabled - boolean 
 * @param {type} preInstallDashboardCardsEnabled - boolean 
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function updateWebHookApp(authToken, appNameOrId, displayName, description, classifications, targetUrl, dashboardCardsEnabled, preInstallDashboardCardsEnabled, args) {
    let body = {};
    body.displayName = displayName;
    body.description = description;
    body.appType = 'WEBHOOK_SMART_APP';
    body.classifications = classifications;
    body.webhookSmartApp = {};
    body.webhookSmartApp.targetUrl = targetUrl;
    body.ui = {};
    body.ui.dashboardCardsEnabled = dashboardCardsEnabled;
    body.ui.preInstallDashboardCardsEnabled = preInstallDashboardCardsEnabled;
    body.iconImage = {};
    if (args) {
        if (args.get("singleInstance"))
            body.singleInstance = args.get("singleInstance");
        if (args.get("url"))
            body.iconImage.url = args.get("url");
        if (args.get("pluginId"))
            body.ui.pluginId = args.get("pluginId");
        if (args.get("pluginUri"))
            body.ui.pluginUri = args.get("pluginUri");
    }
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'PUT', body));
}

/**
 * Update a Lambda App integration
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - String The appName or appId field of an app
 * @param {type} displayName - string <= 75 characters 
 * @param {type} description - string <= 250 characters 
 * @param {type} classifications - Array of AppClassification (string)
 * @param {type} functions - Array of String
 * @param {type} dashboardCardsEnabled - boolean 
 * @param {type} preInstallDashboardCardsEnabled - boolean 
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function updateLambdaApp(authToken, appNameOrId, displayName, description, classifications, functions, dashboardCardsEnabled, preInstallDashboardCardsEnabled, args) {
    let body = {};
    body.displayName = displayName;
    body.description = description;
    body.appType = 'LAMBDA_SMART_APP';
    body.classifications = classifications;
    body.lambdaSmartApp = {};
    body.lambdaSmartApp.functions = functions;
    body.ui = {};
    body.ui.dashboardCardsEnabled = dashboardCardsEnabled;
    body.ui.preInstallDashboardCardsEnabled = preInstallDashboardCardsEnabled;
    body.iconImage = {};
    if (args) {
        if (args.get("singleInstance"))
            body.singleInstance = args.get("singleInstance");
        if (args.get("url"))
            body.iconImage.url = args.get("url");
        if (args.get("pluginId"))
            body.ui.pluginId = args.get("pluginId");
        if (args.get("pluginUri"))
            body.ui.pluginUri = args.get("pluginUri");
    }
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'PUT', body));
}

/**
 * Delete an app.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @returns {unresolved}
 */
function deleteApp(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'DELETE'));
}

/**
 * Get settings for an app.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @returns App settings
 */
function appSettings(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}/settings`, 'GET'));
}

/**
 * Update settings for an app.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @param {type} settings
 * @returns {unresolved}
 */
function updateSettings(authToken, appNameOrId, settings) {
    let body = {};
    body.settings = {};
    if (settings)
        body.settings = settings;
    return rp(requests.request(authToken, `apps/${appNameOrId}/settings`, 'PUT', body));
}

/**
 * Get an app's oauth settings.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @returns Oauth settings
 */
function oauthSettings(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}/oauth`, 'GET'));
}

/**
 * Update an app's oauth settings.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @param {type} clientName - String A name given to the OAuth Client.
 * @param {type} scope - Array of String
 * @param {type} redirectUris - Array of String
 * @returns {unresolved}
 */
function updateOauthSettings(authToken, appNameOrId, clientName, scope, redirectUris) {
    let body = {};
    body.clientName = clientName;
    body.scope = scope;
    body.redirectUris = redirectUris;
    return rp(requests.request(authToken, `apps/${appNameOrId}/oauth`, 'PUT', body));
}

/**
 * Generate an app's oauth client/secret.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @param {type} args - Map(Request Body, value)
 * @returns {unresolved}
 */
function generateAppOauth(authToken, appNameOrId, args) {
    let body = {};
    if (args) {
        if (args.get("clientName"))
            body.clientName = args.get("clientName");
        if (args.get("scope"))
            body.scope = args.get("scope");
    }
    return rp(requests.request(authToken, `apps/${appNameOrId}/oauth/generate`, 'POST', body));
}

/**
 * Prepares to register an App by sending the endpoint a confirmation message.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @returns {unresolved}
 */
function confirmationRequest(authToken, appNameOrId) {
    let body = {};
    return rp(requests.request(authToken, `apps/${appNameOrId}/register`, 'PUT', body));
}

/**
 * Update an app's signature type.
 * @param {type} authToken - OAuth token
 * @param {type} appNameOrId - The appName or appId field of an app
 * @param {type} signatureType - String
 * @returns {unresolved}
 */
function updateSignature(authToken, appNameOrId, signatureType) {
    let body = {};
    if (signatureType)
        body.signatureType = signatureType;
    return rp(requests.request(authToken, `apps/${appNameOrId}/signature-type`, 'PUT', body));
}

module.exports = {
    createWebHookApp: createWebHookApp,
    createLambdaApp: createLambdaApp,
    appsList: appsList,
    appDescription: appDescription,
    updateWebHookApp: updateWebHookApp,
    updateLambdaApp: updateLambdaApp,
    deleteApp: deleteApp,
    appSettings: appSettings,
    updateSettings: updateSettings,
    oauthSettings: oauthSettings,
    updateOauthSettings: updateOauthSettings,
    generateAppOauth: generateAppOauth,
    confirmationRequest: confirmationRequest,
    updateSignature: updateSignature
};




