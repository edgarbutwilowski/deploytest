/*
 (c) Copyright 2020 Edgar Butwilowski
*/
const httpLib = require('http');
const urlLib = require('url');
const httpsLib = require('https');
const xml2jsLib = require('xml2js');

const httpServer = httpLib.createServer((request, masterResponse) => {
    masterResponse.statusCode = 200;
    masterResponse.setHeader('Content-Type', 'application/json');

    // set CORS for all:
    masterResponse.setHeader('Access-Control-Allow-Origin', '*');
    masterResponse.setHeader('Access-Control-Request-Method', '*');
    masterResponse.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    masterResponse.setHeader('Access-Control-Allow-Headers', '*');
    
    masterResponse.end("Dies ist ein Test.");
    
});


httpServer.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log('Server has started');
});
