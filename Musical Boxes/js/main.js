'use strict';

var wavesurfer;
var x =0;

$('div').on('vmousedown',function(e){
	//Prevents event to run more than once per click
	e.stopPropagation();

	//get the id of the div being targeted
	var id = '#'+$(event.target).attr('id');

	// get back-ground color of the id of this div.
	var pColor = $(id).css('background-color');
	

	// set options for wavesurfer.init
	var options = {
        container		: document.querySelector('#wave'),
        waveColor		: '#333333',
		progressColor	: pColor,
        loaderColor   	: 'purple',
        cursorColor   	: 'black',
        scrollParent	: true,
        minPxPerSec		: 200,
        hideScrollbar	: true
    };


    // x++;					Used to check how many times this event was being 						called
    // console.log(x);

		wavesurfer = Object.create(WaveSurfer);
		wavesurfer.init(options);
	
	// use switch to check what the id is and base of id set var song to music file
	var song;
		switch(id){
			case '#c':
				song = 'KirkFranklinAlways.mp3';
				break;
			case '#d':
				song = '4b8p-10sec.mp3';
				break;
			case '#e':
				song = 'Final_Fantasy.ogg';
				break;
			case '#f':
				song = 'EndingFF10.ogg';
				break;
			case '#g':
				song = 'The_Prelude.ogg';
				break;
			case '#a':
				song = 'KHDearlyBeloved.ogg';
				break;
			case '#b':
				song = 'TinaFF7PianoCollections.ogg';
				break;
			default:
				song = 0;
				break;
		}

	// load the music file
	wavesurfer.load('music/'+song);

	// play music file when loaded
	wavesurfer.on('ready', function () {
			wavesurfer.play();
	});
});

// kills music wavesurfer and the div containing the wavesurfer object
$(document).on('vmouseup',function(){
	$('#wave').empty();
	wavesurfer.pause();
	wavesurfer = 0;
});



