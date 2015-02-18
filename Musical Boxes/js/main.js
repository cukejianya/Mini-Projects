'use strict';

var wavesurfer;
var x =0;

$('div').mousedown(function(e){
	//Prevents event to run more than once per click
	e.stopPropagation();

	var id = '#'+$(event.target).attr('id');
//		song = document.getElementById(elm);
//		url = (d)
//		song.currentTime = 0;
//		song.play();
	var pColor = $(id+':active').css('background-color');
	
	var options = {
        container		: document.querySelector('#wave'),
        waveColor		: '#333333',
		progressColor	: pColor,
        loaderColor   	: 'purple',
        cursorColor   	: 'navy'
        // scrollParent	: true,
        // minPxPerSex		: 200
    };
    x++;
    console.log(x);

		wavesurfer = Object.create(WaveSurfer);
		wavesurfer.init(options);
	
	var song;
		switch(id){
			case '#c':
				song = 'KHTheme.ogg';
				break;
			case '#d':
				song = 'TidusTheme.ogg';
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
				elm = 0;
				break;
		}
	wavesurfer.load('../music/'+song);

	wavesurfer.on('ready', function () {
			wavesurfer.play();
	});
});

$(document).mouseup(function(){
	$('#wave').empty();
	wavesurfer.pause();
	wavesurfer = 0;
});

document.addEventListener('DOMContentLoaded', function () {
    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);
});



