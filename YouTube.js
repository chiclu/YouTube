
var key = "AIzaSyAQ6egLhdsR9ObdcK355vrYjGFMChnmHnI";
var videoList = document.getElementById("video-list");
var searchField = document.getElementById("search-field");
var searchButton = document.querySelector(".search-button");
var video = document.getElementById("video");


// Pozdrav Vladice, 
// 	Probao sam da napravim deo za related videos, napravio sam request, ali izgleda da nije dobar. 




function getVideos(searchTerm) {
	var videosRequest = new XMLHttpRequest()
	var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + searchTerm +"&key=" + key;

	videosRequest.open("GET", url)

	videosRequest.onload = function() {
		var videos = JSON.parse(videosRequest.responseText).items
		console.log(videos)

		listVideos(videos)
	}

	videosRequest.send()
}



function listVideos(videos) {
	videoList.innerHTML = "";
	videos.forEach(function(video) {
		createVideo(video)
	})
	addClick();
}

function createVideo(video) {
	var videoElement = document.createElement("div")
	var thumb = '<img src="' + video.snippet.thumbnails.medium.url + '">'
	var title = '<h3>' + video.snippet.title + '</h3>'
	var desc = '<span>' + video.snippet.description + '</span>'

	videoElement.innerHTML = thumb + "<div class='video-text'>" + title + desc + "</div>";
	videoElement.classList.add("video");
	videoElement.dataset.id = video.id.videoId;

	videoList.appendChild(videoElement)
	console.log(video.id.videoId)
}

function onSearch(e) {
	var searchTerm = searchField.value;

	getVideos(searchTerm)
}

function addClick() {
	var clicableElements = document.querySelectorAll('.video > img, .video h3')
	clicableElements.forEach(function(element) {
		element.addEventListener("click", playVideo);
	})
}

function getVideoId(clickedElement) {
	return clickedElement.closest(".video").dataset.id;
}

function playVideo(e) {
	var videoId = getVideoId(e.target);


	video.innerHTML = '<iframe width="100%" height="550" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
	relatedVideos(videoId)
};

	
function relatedVideos(videoId) {
	var relatedRequest = new XMLHttpRequest()
	var relatedUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=' + videoId + '&type=video&key=' + key;

	relatedRequest.open("GET", relatedUrl)

	relatedRequest.onload = function() {
		var videos = JSON.parse(relatedRequest.responseText).items
		console.log(videos)

		listVideos(videos)
	}	
	relatedRequest.send()
}


searchButton.addEventListener("click", onSearch)
searchField.addEventListener("keydown", function(e) {
	e.keyCode === 13 && onSearch()
})

