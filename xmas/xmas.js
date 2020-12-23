// *** This version is for a xmas gift for a friend of mine *** 
// It is intentionally made to look like the game: 4 Pics 1 Word

const answer = "BASS";
const answerLength = answer.length;
let letters = ['F', 'S', 'R', 'G', 'C', 'B', 
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
		let text = document.createElement("p");
		text.className = "bold";
		letter.innerHTML = "";
		letter.className = "letter btn btn-light";
		letter.onclick = answerBoxClicked;
		letter.appendChild(text);
		answerDiv.appendChild(letter);
	}
	
	// Clickable letters setup
	let lettersDiv = document.querySelector("#letters");
	for(let l = 0; l < letters.length; l++){
		let text = lettersDiv.children[l].firstChild;
		text.innerHTML = letters[l];
		text.classList.add('bold');
		lettersDiv.children[l].id = "letter" + l;
		lettersDiv.children[l].onclick = letterClicked;
		lettersDiv.children[l].appendChild(text);
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

	// Finds the text object of the button
	let text = e.target;
	if(text.classList.contains("letter")){
		text = e.target.firstChild;
	}

	// Removes the text from the answer box and
	// finds the letter button and makes it visible once more
	text.innerHTML = "";
	let lettersDiv = document.querySelector("#letters");
	for(let l = 0; l < lettersDiv.children.length; l++){
		if(lettersDiv.children[l].id == text.id){
			lettersDiv.children[l].style.visibility = "visible";
		}
	}
	text.removeAttribute('id');
}

function letterClicked(e){
	if(!isPlaying) return;

	let button  = e.target;
	if(button.classList.contains("bold")){
		button = e.target.parentElement;
	}

	// Finds the leftmost open answer box and 
	// fills it in with the clicked letter and
	// sets its id to the same id as the clicked button
	let answerDiv = document.querySelector("#answer");
	for(let c = 0; c < answerDiv.children.length; c++){
		if(answerDiv.children[c].firstChild.innerHTML == ""){
			answerDiv.children[c].firstChild.innerHTML = button.firstChild.innerHTML;
			answerDiv.children[c].firstChild.id = button.id;
			break;
		}
	}
	
	// Makes the clicked letter vanish
	button.style.visibility = "hidden";
}

function checkAnswer(){
	// Returns FALSE if there are blanks in any of the answer boxes
	let answerDiv = document.querySelector("#answer");
	for(let c = 0; c < answerDiv.children.length; c++){
		if (answerDiv.children[c].children[0].innerHTML == ""){
			for(let c = 0; c < answerDiv.children.length; c++)
				answerDiv.children[c].className = "letter btn btn-light";
			return false;
		}
	}

	// "Contructs" the guess based on the letters in each answer box
	let guess = "";
	for(let c = 0; c < answerDiv.children.length; c++)
		guess += answerDiv.children[c].children[0].innerHTML;
	
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