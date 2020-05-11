const rp = require('request-promise');
const prettyjson = require('prettyjson');
const requests = require('./requests');

/**
 * List all Rooms currently available in a Location.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @returns List of rooms
 */
function roomsList(authToken, locationId) {
    return rp(requests.request(authToken, `locations/${locationId}/rooms`, 'GET'));
}

/**
 * Create a Room for the Location.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @param {type} name - string [ 1 .. 40 ] characters
 * @returns {unresolved}
 */
function createRoom(authToken, locationId, name) {
    let body = {};
    body.name = name;
    return rp(requests.request(authToken, `locations/${locationId}/rooms`, 'POST', body));
}

/**
 * Get a specific Room.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @param {type} roomId - The ID of the room
 * @returns Room data
 */
function roomData(authToken, locationId, roomId) {
    return rp(requests.request(authToken, `locations/${locationId}/rooms/${roomId}`, 'GET'));
}

/**
 * Update a specific Room.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @param {type} roomId - The ID of the room
 * @param {type} name - string [ 1 .. 40 ] characters 
 * @returns {unresolved}
 */
function updateRoom(authToken, locationId, roomId, name) {
    let body = {};
    body.name = name;
    return rp(requests.request(authToken, `locations/${locationId}/rooms/${roomId}`, 'PUT', body));
}

/**
 * Delete a Room from a location.
 * @param {type} authToken - OAuth token
 * @param {type} locationId - The ID of the location
 * @param {type} roomId - The ID of the room
 * @returns {unresolved}
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



