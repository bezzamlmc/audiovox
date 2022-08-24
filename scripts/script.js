(function(){

	"use strict";

// Misc variables - page elements etc.
	const audioPlayer = document.getElementById("audioplayer");
	const audioPlayer2 = document.getElementById("audioplayer2");
	const audioFileUrl = document.getElementById("audiourl");
	const audioFileBrowse = document.getElementById("audiofile");
	const dropZone = document.getElementById("drop_zone");

// Button elements
	const fileRequestButton = document.getElementById("filereq");
	const applyFilterButton = document.getElementById("applyfilter");

// Audio management variables
	var srcUrl = "";

//Default drop behavior needs to be disabled unless it happens on the dropzone!

	document.addEventListener("dragover", function(e) {
		dragoverHandler(e);
	});

	document.addEventListener("drop", function(e) {
		dropHandler(e);
	});

// Handler for file loader
	audioFileBrowse.addEventListener("input", function(e){
		loadFile();
	})

//Handler for file loader
	fileRequestButton.addEventListener("click", function(e){
		loadUrl();
	});

//Handle to apply filter
	applyFilterButton.addEventListener("click", function(e){
		applyFilter();
	});

	//Load audio file
	function loadFile(){
		var file = audioFileBrowse.files[0];
		var audioname = file.name;
		var fReader = new FileReader();

		fReader.readAsDataURL(file);
		fReader.onloadend = function(e) {
			srcUrl = e.target.result;
			audioPlayer.setAttribute("src",srcUrl);
			console.log(`You are attempting to load ${audioname}`);
			showFileName(audioname);
		}
	}

	//Load url
	function loadUrl(){
		var audioname = audioFileUrl.value;
		srcUrl = audioname;
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
				srcUrl = URL.createObjectURL(file);
				audioPlayer.setAttribute("src",srcUrl);
			}
		}
	}

	function showFileName(filnam){
		var audioFile = document.getElementById("dropfile");
		var text =`<b><i>Now loaded: ${filnam}.</i></b>`;
		audioFile.innerHTML = text;
		console.log(`Loaded ${filnam}`)
	}

// getAudio is a jQuery funnction that gets the content of an audio o
// file into a buffered array. Use it with 
//			$.when(setupAudio(URL.createObjectURL(file))).done(function (b) {
//				showFileName(audioname);
//    				});
	function getAudio(srcUrl) {
		var audioHttpRequest = new XMLHttpRequest();
		var dfd = jQuery.Deferred();
		
		audioHttpRequest.open("GET", srcUrl, true);
		audioHttpRequest.responseType = "arraybuffer";
		audioHttpRequest.onload = function () {
		    audioContext.decodeAudioData(audioHttpRequest.response,
			    function (buffer) {
				dfd.resolve(buffer);
			    });
		}
		audioHttpRequest.send();
	    
		return dfd.promise();
	    }

//Apply a filter - TODO: structure and node functionality
	function applyFilter(){
		audioPlayer2.setAttribute("src",srcUrl);
		const audioContext = new AudioContext();
//TODO Here we assume there is source! Add validation
		var src = audioContext.createMediaElementSource(audioPlayer2);
		var filter = audioContext.createBiquadFilter();
		src.connect(filter);
		filter.connect(audioContext.destination);
//TODO I have no idea what I am doing but can figure it out if I read the documentation!!
		filter.type = "lowshelf";
		filter.frequency.value = 1000;
		filter.gain.value = -25;
		audioPlayer2.play();
		console.log("Applied filter");
	}


})();