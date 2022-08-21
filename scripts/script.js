(function(){

	"use strict";

// Misc variables - page elements etc.
	const audioPlayer = document.getElementById("audioplayer");
	const audioFileLink = document.getElementById("audiofile")

// Button handlers
	const fileRequestButton = document.getElementById("filereq");

	fileRequestButton.addEventListener("click", function(event){
		read1();
	});

	//Load audio file
	function read1(){
		var audioname = audioFileLink.value;
		audioPlayer.setAttribute("src",audioname);

		alert(`You are attempting to load ${audioname}`);
	}

	function playAudio() {
//Audio player

		console.log("Load audio to be played by the user");

	}

})();