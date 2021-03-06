const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List all Rooms currently available in a Location.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @returns {List<Object>}
 */
function roomsList(authToken, locationId) {
    return rp(requests.request(authToken, `locations/${locationId}/rooms`, 'GET'));
}

/**
 * Create a Room for the Location.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @param {string} name - A name given for the room.
 */
function createRoom(authToken, locationId, name) {
    let body = {};
    body.name = name;
    return rp(requests.request(authToken, `locations/${locationId}/rooms`, 'POST', body));
}

/**
 * Get a specific Room.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @param {string} roomId - The ID of the room.
 * @returns {Object}
 */
function roomData(authToken, locationId, roomId) {
    return rp(requests.request(authToken, `locations/${locationId}/rooms/${roomId}`, 'GET'));
}

/**
 * Update a specific Room.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @param {string} roomId - The ID of the room.
 * @param {string} name - A name for the room.
 */
function updateRoom(authToken, locationId, roomId, name) {
    let body = {};
    body.name = name;
    return rp(requests.request(authToken, `locations/${locationId}/rooms/${roomId}`, 'PUT', body));
}

/**
 * Delete a Room from a location.
 * @param {string} authToken - OAuth token.
 * @param {string} locationId - The ID of the location.
 * @param {string} roomId - The ID of the room.
 */
function deleteRoom(authToken, locationId, roomId) {
    return rp(requests.request(authToken, `locations/${locationId}/rooms/${roomId}`, 'DELETE'));
}

module.exports = {
    roomsList: roomsList,
    createRoom: createRoom,
    roomData: roomData,
    updateRoom: updateRoom,
    deleteRoom: deleteRoom
};



