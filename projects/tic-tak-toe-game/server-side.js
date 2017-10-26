var util    = require( 'util' ),
    my_http = require( 'http' ),
    fs      = require( 'fs' ),
    url     = require( 'url' );

var ROOT_DIR = 'html';

function onRequest( request, response ) {
            //handleDefaultRequest( request, response );
    var urlObj = url.parse(request.url, true, false);

    var filePath = ROOT_DIR + urlObj.pathname;

    if(urlObj.pathname === '/') filePath = ROOT_DIR + '/webpage.html';

    fs.readFile(filePath, function(err, data) {
        if(err) {
            //report error to console
            console.log('ERROR: ' + JSON.stringify(err));
            //respond with not found 404 to client
            response.writeHead(404);
            response.end();
            return;
        }
        response.writeHead(200);
        response.end(data);
    });
}

my_http.createServer( onRequest )
    .listen( 3000 );
console.log( "Server Running on 3000" );