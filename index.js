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
     
    const queryParams = urlLib.parse(request.url, true).query;

    httpsLib.get("https://www.openstreetmap.org/api/0.6/map?bbox=" + queryParams.bbox,
        response => {

            let osmData = "";
            response.on("data", dataPart => {
                osmData += dataPart;
            });

            response.on("end", () => {
                const xmlParser = xml2jsLib.Parser();
                xmlParser.parseString(osmData, (error, osmJSON) => {
                     masterResponse.end("Dies ist ein Test 4.");
                });
            });
        }).on("error", error => {
            console.log(error.message);
        });
    
});


httpServer.listen(process.env.PORT || 3000, () => {
    console.log('Server has started');
});
