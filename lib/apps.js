const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Create a WebHook App integration.
 * @param {string} authToken - OAuth token.
 * @param {string} appName - <^[a-z0-9.-_]{1,250}$>. A globally unique, developer-defined identifier for an app.
 * @param {string} displayName - <= 75 characters. A default display name for an app.
 * @param {String} description - <= 250. A default description for an app.
 * @param {Array<string>} classifications - Array of AppClassification (string). 
 * @param {string} targetUrl - A URL that should be invoked during execution.
 * @param {boolean} dashboardCardsEnabled - Required. 
 * @param {boolean} preInstallDashboardCardsEnabled - Required. 
 * @param {Map} args - Not required arguments.
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
 * Create a WebHook App integration.
 * @param {string} authToken - OAuth token.
 * @param {string} appName - <^[a-z0-9.-_]{1,250}$>. A globally unique, developer-defined identifier for an app.
 * @param {string} displayName - <= 75 characters. A default display name for an app.
 * @param {String} description - <= 250. A default description for an app.
 * @param {Array<string>} classifications - Array of AppClassification (string). 
 * @param {Array<string>} functions - A list of AWS arns referencing a Lambda function.
 * @param {boolean} dashboardCardsEnabled - Required. 
 * @param {boolean} preInstallDashboardCardsEnabled - Required. 
 * @param {Map} args - Not required arguments.
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
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>} 
 */
function appsList(authToken) {
    return rp(requests.request(authToken, `apps`, 'GET'));
}

/**
 * Get a single app.
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @returns {Object} 
 */
function appDescription(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'GET'));
}

/**
 * Update a WebHook App integration
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {string} displayName - <= 75 characters. A default display name for an app.
 * @param {String} description - <= 250. A default description for an app.
 * @param {Array<string>} classifications - Array of AppClassification (string).
 * @param {string} targetUrl - A URL that should be invoked during execution.
 * @param {boolean} dashboardCardsEnabled - Required. 
 * @param {boolean} preInstallDashboardCardsEnabled - Required. 
 * @param {Map} args - Not required arguments.
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
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {string} displayName - <= 75 characters. A default display name for an app.
 * @param {String} description - <= 250. A default description for an app.
 * @param {Array<string>} classifications - Array of AppClassification (string). 
 * @param {Array<string>} functions - A list of AWS arns referencing a Lambda function.
 * @param {boolean} dashboardCardsEnabled - Required. 
 * @param {boolean} preInstallDashboardCardsEnabled - Required. 
 * @param {Map} args - Not required arguments.
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
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 */
function deleteApp(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}`, 'DELETE'));
}

/**
 * Get settings for an app.
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @returns {Object}
 */
function appSettings(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}/settings`, 'GET'));
}

/**
 * Update settings for an app.
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {Object} settings - Additional Properties.
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
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @returns {Object}
 */
function oauthSettings(authToken, appNameOrId) {
    return rp(requests.request(authToken, `apps/${appNameOrId}/oauth`, 'GET'));
}

/**
 * Update an app's oauth settings.
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {string} clientName - A name given to the OAuth Client.
 * @param {Array<string>} scope - A list of SmartThings API OAuth scope identifiers.
 * @param {Array<string>} redirectUris - A list of redirect URIs.
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
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {Map} args - Not required arguments.
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
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 */
function confirmationRequest(authToken, appNameOrId) {
    let body = {};
    return rp(requests.request(authToken, `apps/${appNameOrId}/register`, 'PUT', body));
}

/**
 * Update an app's signature type.
 * @param {string} authToken - OAuth token.
 * @param {string} appNameOrId - The appName or appId field of an app.
 * @param {string} signatureType - The http signature type used for authorizing event delivery.
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




