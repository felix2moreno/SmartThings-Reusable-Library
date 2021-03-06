const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List of rules for the location for the given token principal.
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>}
 */
function rulesList(authToken) {
    return rp(requests.request(authToken, `rules`, 'GET'));
}

/**
 * Create a rule for the location and token principal.
 * @param {string} authToken - OAuth token.
 * @param {string} name - Name for the rule.
 * @param {Array<Object>} actions - Array of Action.
 * @param {string} timeZoneId - Time zone ID for this rule.
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
 * @param {string} authToken - OAuth token.
 * @param {string} ruleId - The rule ID.
 * @returns {Object}
 */
function ruleData(authToken, ruleId) {
    return rp(requests.request(authToken, `rules/${ruleId}`, 'GET'));
}

/**
 * Update a rule.
 * @param {string} authToken - OAuth token.
 * @param {string} ruleId - The rule ID.
 * @param {string} name - Name for the rule.
 * @param {Array<Object>} actions - Array of Action.
 * @param {string} timeZoneId - Time zone ID for this rule.
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
 * @param {string} authToken - OAuth token.
 * @param {string} ruleId - The rule ID.
 */
function deleteRule(authToken, ruleId) {
    return rp(requests.request(authToken, `rules/${ruleId}`, 'DELETE'));
}

/**
 * Trigger Rule execution given a rule ID.
 * @param {string} authToken - OAuth token.
 * @param {string} ruleId - The rule ID.
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




