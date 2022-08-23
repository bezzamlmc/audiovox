(function(){

	"use strict";

// Misc variables - page elements etc.
	const audioPlayer = document.getElementById("audioplayer");
	const audioFileUrl = document.getElementById("audiourl");
	const audioFileBrowse = document.getElementById("audiofile");
	const dropZone = document.getElementById("drop_zone");

// Button handlers
	const fileRequestButton = document.getElementById("filereq");

//Default drop behavior needs to be disabled unless it happens on the dropzone!

	document.addEventListener("dragover", function(e) {
		dragoverHandler(e);
	});

	document.addEventListener("drop", function(e) {
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
		var file = audioFileBrowse.files[0];
		var audioname = file.name;
		var fReader = new FileReader();

		fReader.readAsDataURL(file);
		fReader.onloadend = function(e) {
//			audioPlayer.setAttribute("src",URL.createObjectURL(file));
			audioPlayer.setAttribute("src",e.target.result);
			console.log(`You are attempting to load ${audioname}`);
			showFileName(audioname);
		}
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
		e.preventDefault();

		if (e.target.className == "drop_zone"){
			e.stopPropagation();
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
	}

	function showFileName(filnam){
		var audioFile = document.getElementById("dropfile");
		var text =`<b><i>Now loaded: ${filnam}.</i></b>`;
		audioFile.innerHTML = text;
		console.log(`Loaded ${filnam}`)
	}

	function playAudio() {
//Audio player
		console.log("Load audio to be played by the user");

	}


})();

	
