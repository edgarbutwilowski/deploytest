/*
 (c) Copyright 2020 Edgar Butwilowski
*/
const httpLib = require('http');
const urlLib = require('url');
const httpsLib = require('https');
const xml2jsLib = require('xml2js');

function transformToCesiumBuildings(osmJSON, baseheight) {
    let cesiumBuildings = ['Aha1', 'Aha2'];
    return cesiumBuildings
}

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
                     let cesiumBuildings = transformToCesiumBuildings(osmJSON, + queryParams.baseheight);
                     masterResponse.end(JSON.stringify(cesiumBuildings));
                });
            });
        }).on("error", error => {
            console.log(error.message);
        });
    
});


httpServer.listen(process.env.PORT || 3000, () => {
    console.log('Server has started');
});
