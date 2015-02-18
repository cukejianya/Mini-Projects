var wavesurfer;
$('div').mousedown(function(){
	var id = $(event.target).attr('id');

//		song = document.getElementById(elm);
//		url = (d)
//		song.currentTime = 0;
//		song.play();
		wavesurfer = Object.create(WaveSurfer);

		wavesurfer.init({
			container: document.querySelector('#wave'),
			waveColor: 'violet',
			progressColor: 'purple'
		});

		wavesurfer.on('ready', function () {
			wavesurfer.play();
		});
		
		
		switch(id){
			case 'c':
				wavesurfer.load('../music/TidusTheme.ogg');
				break;
			case 'd':
				elm = 'second';
				break;
			case 'e':
				elm = 'third';
				break;
			case 'f':
				elm = 'fourth';
				break;
			case 'g':
				elm = 'fifth';
				break;
			case 'a':
				elm = 'sixth';
				break;
			case 'b':
				elm = 'seventh';
				break;
			default:
				elm = 0;
				break;
		}
});

$('div').mouseup(function(){
	wavesurfer.destory();
})	
