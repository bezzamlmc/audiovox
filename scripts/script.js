(function(){

	"use strict";

// Misc variables - page elements etc.
	const audioPlayer = document.getElementById("audioplayer");
	const audioFileLink = document.getElementById("audiofile");
	const dropZone = document.getElementById("drop_zone");

// Button handlers
	const fileRequestButton = document.getElementById("filereq");

//Enable drops
	dropZone.addEventListener("dragover", function(e) {
		dragoverHandler(e);
	});

	dropZone.addEventListener("drop", function(e) {
		dropHandler(e);
	});

	fileRequestButton.addEventListener("click", function(e){
		read1();
	});

	//Load audio file
	function read1(){
		var audioname = audioFileLink.value;
		audioPlayer.setAttribute("src",audioname);

		console.log(`You are attempting to load ${audioname}`);
	}

	function dragoverHandler(e){
		e.preventDefault();
		console.log("dragover event");
	}

	function dropHandler(e){
		e.stopPropagation();
		e.preventDefault();
		var data = e.dataTransfer;
		var lf = data.files.length;
		console.log(`You are dropping ${lf} files`);
		if (lf > 0) {
			var file = data.files[0];
			var audioname = file.name.substring(0,file.name.length-4);
			console.log(`${audioname}`)
			audioPlayer.setAttribute("src",URL.createObjectURL(file));
		}
	}

	function playAudio() {
//Audio player

		console.log("Load audio to be played by the user");

	}


})();

	
