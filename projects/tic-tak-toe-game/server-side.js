var util    = require( 'util' ),
    my_http = require( 'http' ),
    fs      = require( 'fs' ),
    url     = require( 'url' );

function handleDefaultRequest( request, response ) {
    fs.readFile( './webpage.html', function ( err, data ) {
        if ( err ) {
            response.writeHead( 404, { 'Content-type': 'text/plan' } );
            response.write( 'Page Was Not Found' );
            response.end();

        } else {
            response.writeHead( 200 );
            response.write( data );

            response.end();
        }

    } );
}

function onRequest( request, response ) {
            handleDefaultRequest( request, response );
}

my_http.createServer( onRequest )
    .listen( 3000 );
console.log( "Server Running on 3000" );



