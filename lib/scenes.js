const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * Fetch a list of Scenes for the logged in user filtered by locationIds. 
 * @param {string} authToken - OAuth token.
 * @returns {List<Object>}
 */
function scenesList(authToken) {
    return rp(requests.request(authToken, `scenes`, 'GET'));
}

/**
 * Execute a Scene by id for the logged in user and given locationId.
 * @param {string} authToken - OAuth token.
 * @param {string} sceneId - The ID of the Scene.
 * @param {string} status - Scene status.
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
