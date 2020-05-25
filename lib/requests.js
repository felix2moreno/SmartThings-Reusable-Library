const rp = require('request-promise');
const prettyjson = require('prettyjson');

const stApi = 'https://api.smartthings.com/v1/';
const prettyjsonOptions = {};

/**
 * Request-promise npm for SmartThings API.
 * @param {string} authToken - Oauth token.
 * @param {string} path - API aditional URL.
 * @param {string} method - HTTP petition type.
 * @param {Array<Object>} body - Petition body.
 * @returns {unresolved}
 */
function request(authToken, path, method, body) {
    let options = {
        url: `${stApi}${path}`,
        method: method,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    };
    if (body)
        options.body = body;
    console.log(prettyjson.render(options, prettyjsonOptions));
    return rp(options);
}

module.exports = {
    request: request
};


