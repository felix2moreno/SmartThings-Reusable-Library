const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List of rules for the location for the given token principal.
 * @param {type} authToken - OAuth token
 * @returns List of rules
 */
function rulesList(authToken) {
    return rp(requests.request(authToken, `rules`, 'GET'));
}

/**
 * Create a rule for the location and token principal.
 * @param {type} authToken - OAuth token
 * @param {type} name - String
 * @param {type} actions - Array of Action
 * @param {type} timeZoneId - String
 * @returns {unresolved}
 */
function newRule(authToken, name, actions, timeZoneId) {
    let body = {};
    body.name = name;
    body.actions = actions;
    if (timeZoneId)
        body.timeZoneId = timeZoneId;
    return rp(requests.request(authToken, `rules`, 'POST', body));
}

/**
 * Get a rule.
 * @param {type} authToken - OAuth token
 * @param {type} ruleId - The rule ID
 * @returns Rule data
 */
function ruleData(authToken, ruleId) {
    return rp(requests.request(authToken, `rules/${ruleId}`, 'GET'));
}

/**
 * Update a rule.
 * @param {type} authToken - OAuth token
 * @param {type} ruleId - The rule ID
 * @param {type} name - String
 * @param {type} actions - Array of Action
 * @param {type} timeZoneId - String
 * @returns {unresolved}
 */
function updateRule(authToken, ruleId, name, actions, timeZoneId) {
    let body = {};
    body.name = name;
    body.actions = actions;
    if (timeZoneId)
        body.timeZoneId = timeZoneId;
    return rp(requests.request(authToken, `rules/${ruleId}`, 'PUT', body));
}

/**
 * Delete a rule.
 * @param {type} authToken - OAuth token
 * @param {type} ruleId - The rule ID
 * @returns {unresolved}
 */
function deleteRule(authToken, ruleId) {
    return rp(requests.request(authToken, `rules/${ruleId}`, 'DELETE'));
}

/**
 * Trigger Rule execution given a rule ID.
 * @param {type} authToken - OAuth token
 * @param {type} ruleId - The rule ID
 * @returns {unresolved}
 */
function executeRule(authToken, ruleId) {
    let body = {};
    return rp(requests.request(authToken, `rules/execute/${ruleId}`, 'POST', body));
}

module.exports = {
    rulesList: rulesList,
    newRule: newRule,
    ruleData: ruleData,
    updateRule: updateRule,
    deleteRule: deleteRule,
    executeRule: executeRule
};




