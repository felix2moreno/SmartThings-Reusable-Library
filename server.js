'use strict';

/* npm node.js modules */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');
const httpSignature = require('http-signature');
const prettyjson = require('prettyjson');
const rp = require('request-promise');

/* node.js implemented modules */
const apps = require('./lib/apps');
const stConfig = require('./lib/config');
const deviceprofiles = require('./lib/deviceprofiles');
const devices = require('./lib/devices');
const installedApps = require('./lib/installedapps');
const locations = require('./lib/locations');
const schedules = require('./lib/schedules');
const subscriptions = require('./lib/subscriptions');
/******************************************************/
const rooms = require('./lib/rooms');
const rule = require('./lib/rules');
const scenes = require('./lib/scenes');

/* SmartThings API */
const stApi = 'https://api.smartthings.com/v1';
const prettyjsonOptions = {};
const app = express();
app.use(bodyParser.json());

/**
 * Entry point for callbacks by SmartThings.
 * Every incoming call will have a lifecycle, which determines how the
 * app should respond.
 *
 * All requests will have their HTTP signature verified to ensure the
 * request is actually from SmartThings, except for the PING or CONFIRMATION lifecycle
 * request (which occurs as the app is being created).
 */
app.post('/', function (req, response) {
    // We don't yet have the public key during PING or CONFIRMATION (when the app is created),
    // so no need to verify the signature. All other requests are verified.
    if (req.body && (req.body.lifecycle === "PING" || req.body.lifecycle === "CONFIRMATION") || signatureIsVerified(req)) {
        handleRequest(req, response);
    } else {
        response.status(401).send("Forbidden");
    }
});

/**
 * Verifies that the request is actually from SmartThings.
 * @returns true if verified
 */
function signatureIsVerified() {
    return true;
}

function handleRequest(req, response) {
    let evt = req.body;
    let lifecycle = evt.lifecycle;
    let res;

    console.log(`${lifecycle} lifecycle. Request body:`);
    console.log(prettyjson.render(evt, prettyjsonOptions));

    switch (lifecycle) {
        // PING happens during app creation. Purpose is to verify app
        // is alive and is who it says it is. Is deprecated.
        case 'PING':
        {
            let chal = evt.pingData.challenge;
            response.json({statusCode: 200, pingData: {challenge: chal}});
            break;
        }
        // CONFIRMATION lifecycle phase occurs when a WebHook SmartApp is registered.
        case 'CONFIRMATION' :
        {
            rp.get(evt.confirmationData.confirmationUrl);
            response.json({statusCode: 200});
            break;
        }
        // CONFIGURATION happens as user begins to install the app.
        case 'CONFIGURATION':
        {
            res = stConfig.handle(evt.configurationData);
            console.log(prettyjson.render({configurationData: res}, prettyjsonOptions));
            response.json({statusCode: 200, configurationData: res});
            break;
        }
        // INSTALL happens after a user finishes configuration, and installs the
        // app.
        case 'INSTALL':
        {
            let token = evt.installData.authToken;
            let installedApp = evt.installData.installedApp;
            /**
             *  TO DO
             */
            response.json({statusCode: 200, installData: {}});
            break;
        }
        // UPDATE happens when a user updates the configuration of an
        // already-installed app.
        case 'UPDATE':
        {
            let token = evt.updateData.authToken;
            let installedApp = evt.updateData.installedApp;
            /**
             *  TO DO
             */
            response.json({statusCode: 200, updateData: {}});
            break;
        }
        // UNINSTALL happens when a user uninstalls the app.
        case 'UNINSTALL':
        {
            response.json({statusCode: 200, uninstallData: {}});
            break;
        }
        // EVENT happens when any subscribed-to event or schedule executes.
        case 'EVENT':
        {
            handleEvent(evt.eventData);
            response.json({statusCode: 200, eventData: {}});
            break;
        }
        default:
        {
            console.log(`Lifecycle ${lifecycle} not supported`);
        }
    }
}

/**
 * Handles incoming EVENT lifecycle requests.
 *
 * 
 * @param {Object} eventData - The eventData associated with this event.
 */
function handleEvent(eventData) {
    const eventType = eventData.events[0].eventType;
    const token = eventData.authToken;
    if ("TIMER_EVENT" === eventType) {
        let timerEvent = eventData.events[0].timerEvent;
        console.log(`Received timer event for schedule ${timerEvent.name} at ${timerEvent.time}`);
        /**
         *  TO DO
         */
    } else {
        console.error(`This app only expects TIMER_EVENTs. Got ${eventType}`);
    }
}

let server = app.listen(3000);

module.exports = server;
console.log('Open: http://127.0.0.1:3000');



