
function parseSong(songFileContent){

let songLines = songFileContent.split(/\r\n|\n|\r/);
let parsedLines = [];

let isInSection = false;
let currentSection = {};

for(let index = 0; index < songLines.length; index++) {
    let currentLine = songLines[index];

    // Process section starts
    if(!isInSection) {
        let isSectionStart = currentLine.match(/^[a-zA-Z0-9]+:$/);

        if(isSectionStart) {
            currentSection = {
                'label': currentLine,
                'lines': []
            };
            isInSection = true;
            continue;
        }
    }

    // Process section end
    if(currentLine === "") {
        isInSection = false;
        currentSection['lines'] = stripOutChords(currentSection['lines']);
        parsedLines.push(currentSection['lines'].join("\n"));
    }
	if(isInSection){
    currentSection['lines'].push(currentLine);
	}
}
return parsedLines.join("\n");
}
function stripOutChords(verseLines) {
	let newChordLines = [];
	for(let i=0; i<verseLines.length ; i++){
		let chordLine = "";
		let currentVerseLines = verseLines[i];
		let chordsInLine = currentVerseLines.match(/\[[a-zA-Z\#0-9]\]/g);
		let chordsIndexes = {};
		let lastFoundIndex =0;
		for(let k = 0; k<chordsInLine.length; k++){
			let foundIndex = currentVerseLines.indexOf(chordsInLine[k],lastFoundIndex);
			chordsIndexes[foundIndex]=(chordsInLine[k]);
			lastFoundIndex = foundIndex+chordsInLine[k].length;
		}
		let chordLocations = Object.keys(chordsIndexes);
		for(let j=0; j<chordLocations.length; j++){
			let padding = new Array (chordLocations[j]);
			chordLine += padding + chordIndexes[chordLocations[j]];
			currentVerseLines=currentVerseLines.substr(0,chordLocations[j])
			+currentVerseLines.substr(chordLocations[j]+chordIndexes[chordLocations[j]].length);
		}
	newChordLines.push(chordLine);
	newChordLines.push(currentVerseLines);
	}
	return newChordLines;
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