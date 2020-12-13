const answer = "BASS";
const answerLength = answer.length;
const letters = ['F', 'S', 'R', 'G', 'C', 'B', 
				'S', 'K', 'E', 'A', 'L', 'U'];
const fps = 20;
let isPlaying;

function init(){
	isPlaying = true;
	setupButtons();
	loop();
}

function loop(){
	// Checks if the game is won, 
	// calls this function again if the game is still going
	if(checkAnswer()){
		isPlaying = false;
	} else{
		requestAnimationFrame(loop, 1000/fps);
	}
}

function setupButtons(){
	// Pictures setup
	let pictures = document.querySelector("#picture-grid");
	for(let pic = 0; pic < pictures.children.length; pic++){
		pictures.children[pic].onclick = pictureClicked;
	}
	
	// Answer boxes setup
	let answerDiv = document.querySelector("#answer");
	for(let l = 0; l < answerLength; l++){
		let letter = document.createElement("button");
		letter.innerHTML = "";
		letter.className = "letter btn btn-secondary";
		letter.onclick = answerBoxClicked;
		answerDiv.appendChild(letter);
	}
	
	// Clickable letters setup
	let lettersDiv = document.querySelector("#letters");
	for(let l = 0; l < lettersDiv.children.length; l++){
		lettersDiv.children[l].innerHTML = letters[l];
		lettersDiv.children[l].id = "letter" + l;
		lettersDiv.children[l].onclick = letterClicked;
	}
}

function pictureClicked(e){
	let zoomedPicDiv = document.querySelector("#zoomedPicDiv");
	let zoomedPic = document.createElement("img");
	zoomedPicDiv.innerHTML = "";
	zoomedPic.setAttribute("src", e.target.getAttribute("src"));
	zoomedPic.setAttribute("alt", e.target.getAttribute("alt"));
	zoomedPicDiv.appendChild(zoomedPic);
}

function answerBoxClicked(e){
	if(!isPlaying) return;

	// Removes the text from the answer box and
	// finds the letter button and makes it visible once more
	e.target.innerHTML = "";
	let lettersDiv = document.querySelector("#letters");
	for(let l = 0; l < lettersDiv.children.length; l++){
		if(lettersDiv.children[l].id == e.target.id)
			lettersDiv.children[l].style.visibility = "visible";
	}
}

function letterClicked(e){
	if(!isPlaying) return;

	// Finds the leftmost open answer box and 
	// fills it in with the clicked letter and
	// sets its id to the same id as the clicked button
	let answerDiv = document.querySelector("#answer");
	for(let c = 0; c < answerDiv.children.length; c++){
		if(answerDiv.children[c].innerHTML == ""){
			answerDiv.children[c].innerHTML = e.target.innerHTML;
			answerDiv.children[c].id = e.target.id;
			break;
		}
	}

	// Makes the clicked letter vanish
	e.target.style.visibility = "hidden";
}

function checkAnswer(){
	// Returns FALSE if there are blanks in any of the answer boxes
	let answerDiv = document.querySelector("#answer");
	for(let c = 0; c < answerDiv.children.length; c++){
		if (answerDiv.children[c].innerHTML == ""){
			for(let c = 0; c < answerDiv.children.length; c++)
				answerDiv.children[c].className = "letter btn btn-secondary";
			return false;
		}
	}

	// "Contructs" the guess based on the letters in each answer box
	let guess = "";
	for(let c = 0; c < answerDiv.children.length; c++)
		guess += answerDiv.children[c].innerHTML;
	
	// Returns whether the guess is the same as the answer
	// and changes the color of the text
	if(guess == answer){
		for(let c = 0; c < answerDiv.children.length; c++)
			answerDiv.children[c].className = "letter btn btn-success";
		return true;
	} else{
		for(let c = 0; c < answerDiv.children.length; c++)
			answerDiv.children[c].className = "letter btn btn-danger";
		return false;
	}
}

// runs init only after the page is done loaded
window.onload = () => {
	init();
}