// TODO: Show an example of using git
function parseSong( songFileContent ) {

    let songLines   = songFileContent.split( /\r\n|\n|\r/ );
    let parsedLines = [];

    let isInSection    = false;
    let currentSection = {};

    for ( let index = 0; index < songLines.length; index++ ) {
        let currentLine = songLines[ index ];

        // Process section starts
        if ( !isInSection ) {
            let isSectionStart = currentLine.match( /^[a-zA-Z0-9]+:$/ );

            if ( isSectionStart ) {
                currentSection = {
                    'label': currentLine,
                    'lines': []
                };
                isInSection    = true;
                continue;
            }
        }

        // Process section end

        if ( isInSection && currentLine === "" ) {
            isInSection               = false;
            currentSection[ 'lines' ] = stripOutChords( currentSection[ 'lines' ] );
            parsedLines.push( currentSection[ 'lines' ].join( "\n" ) );
        }
        if ( isInSection ) {
            currentSection[ 'lines' ].push( currentLine );
        }
    }
    return parsedLines.join( "\n" );
}

function stripOutChords( verseLines ) {
    let newChordLines = [];
    for ( let i = 0; i < verseLines.length; i++ ) {
        let chordLine         = "";
        let currentVerseLines = verseLines[ i ];
        let chordsInLine      = currentVerseLines.match( /\[[a-zA-Z\#0-9]+\]/g );
        if ( chordsInLine ) {
            let chordsIndexes  = {};
            let lastFoundIndex = 0;
            for ( let k = 0; k < chordsInLine.length; k++ ) {
                let foundIndex              = currentVerseLines.indexOf( chordsInLine[ k ], lastFoundIndex );
                chordsIndexes[ foundIndex ] = (chordsInLine[ k ]);
                lastFoundIndex              = foundIndex + chordsInLine[ k ].length;
            }
            let chordLocations    = Object.keys( chordsIndexes );
            let charactersRemoved = 0;
            for ( let j = 0; j < chordLocations.length; j++ ) {
                let currentChordIndex = parseInt( chordLocations[ j ] );
                let currentChordValue = chordsIndexes[ currentChordIndex ];

                let amountToPadChordLine = (currentChordIndex+1) - chordLine.length - charactersRemoved;
                let padding              = new Array( Math.max( 2, amountToPadChordLine ) );

                chordLine += padding.join( " " ) + currentChordValue;

                let chordVersePadding = "";
                let numCharactersBetween =0;
                if ( amountToPadChordLine < 0 ) {
                    let previousChordIndex = parseInt( chordLocations[ j - 1 ] );
                    numCharactersBetween = currentChordIndex-currentChordValue.length-1-previousChordIndex;

                    chordVersePadding      = new Array( Math.abs( amountToPadChordLine ) + numCharactersBetween );

                    chordVersePadding = chordVersePadding.join( ' ' );
                }

                let amountToRemove = currentChordValue.length + 1;
                currentVerseLines  =
                    currentVerseLines.substr( 0, currentChordIndex - charactersRemoved ) +
                    chordVersePadding +
                    currentVerseLines.substr( currentChordIndex-charactersRemoved + amountToRemove);

                charactersRemoved += amountToRemove-chordVersePadding.length;
            }
            newChordLines.push( chordLine );
        }
        newChordLines.push( currentVerseLines );
    }
    return newChordLines;
}
var coords = [];
for (var i = 0; i<newChordLines.length; i++){
    navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        coords.push(lat,lon);
        locationCode()
    });
}
function locationCode(){
    alert(coords);
}

/*
let parsedLines = [
    {
        'label': 'verse1',
        'lines': [
            '       [E]                           [G#min]',
            'Well i tried to make it sunday but i got so damned depressed',
            'That i [A] set my sights on [E] monday and i [G#min] got myself undressed'
        ]
    }
];*/

// x = position of the chord
// create a new line before current line
// add x number of spaces to previous line
// cut chord from current line and append to previous line
// repeat for all instances of chords in this line