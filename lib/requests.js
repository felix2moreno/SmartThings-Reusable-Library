const rp = require('request-promise');
const prettyjson = require('prettyjson');

const stApi = 'https://api.smartthings.com/v1/';
const prettyjsonOptions = {};

/**
 * Request-promise npm for SmartThings API
 * @param {type} authToken
 * @param {type} path
 * @param {type} method
 * @param {type} body
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


