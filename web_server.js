var util    = require( 'util' ),
    my_http = require( 'http' ),
    fs      = require( 'fs' ),
    url     = require( 'url' );

function handleSongRequest( request, response ) {
    fs.readFile( 'songs/sister_golden_hair.txt', "utf8", function ( err, data ) {
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

my_http.createServer( function ( request, response ) {
    //response.writeHeader(200, {"Content-Type": "text/plain"});
    //response.write("Songs Database");

    let path = url.parse( request.url, true );
	console.log(path.pathname);
    switch ( path.pathname ) {
        case '/get_songs':
            handleSongRequest( request, response );
            break;
        default:
            handleDefaultRequest( request, response );
            break;
    }
} )
       .listen( 3000 );
console.log( "Server Running on 3000" );



