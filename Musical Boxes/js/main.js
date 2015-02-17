var song;
$('div').mousedown(function(){
	var id = $(event.target).attr('id');
	switch(id){
		case 'c':
			elm = 'first';
			break;

		default:
			elm = 0;
			break;
	}
		song = document.getElementById(elm);
		song.currentTime = 0;
		song.play();
});
$(document).mouseup(function(){
	song.pause();
})