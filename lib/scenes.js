const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Fetch a list of Scenes for the logged in user filtered by locationIds. 
 * @param {type} authToken - OAuth token
 * @returns Scenes list
 */
function scenesList(authToken) {
    return rp(requests.request(authToken, `scenes`, 'GET'));
}

/**
 * Execute a Scene by id for the logged in user and given locationId.
 * @param {type} authToken - OAuth token
 * @param {type} sceneId - The ID of the Scene
 * @param {type} status - String
 * @returns {unresolved}
 */
function executeScene(authToken, sceneId, status) {
    let body = {};
    if (status)
        body.status = status;
    return rp(requests.request(authToken, `scenes/${sceneId}/execute`, 'POST', body));
}

module.exports = {
    scenesList: scenesList,
    executeScene: executeScene
};
