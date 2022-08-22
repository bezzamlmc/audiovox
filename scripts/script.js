(function(){

	"use strict";

// Misc variables - page elements etc.
	const audioPlayer = document.getElementById("audioplayer");
	const audioFileUrl = document.getElementById("audiourl");
	const audioFileBrowse = document.getElementById("audiofile");
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

// Handler for link loader
	audioFileBrowse.addEventListener("input", function(e){
		loadFile();
	})

	fileRequestButton.addEventListener("click", function(e){
		loadUrl();
	});

	//Load audio file
	function loadFile(){
		var audioname = audioFileBrowse.value;
		var file = audioFileBrowse.files[0];
		audioPlayer.setAttribute("src",URL.createObjectURL(file));

		console.log(`You are attempting to load ${audioname}`);
		showFileName(audioname);
	}

	//Load url
	function loadUrl(){
		var audioname = audioFileUrl.value;
		audioPlayer.setAttribute("src",audioname);
		showFileName(audioname);
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
			var audioname = file.name;
			console.log(`${audioname}`);
			audioPlayer.setAttribute("src",URL.createObjectURL(file));
			showFileName(audioname);
		}
	}

	function showFileName(filnam){
		var audioFile = document.getElementById("dropfile");
		var text =`<b><i>Now loaded ${filnam}.</i></b>`;
		audioFile.innerHTML = text;
		console.log(`Loaded ${filnam}`)
	}

	function playAudio() {
//Audio player
		console.log("Load audio to be played by the user");

	}


})();

	
