class AudioController {
    constructor() {
        this.moleBoing = new Audio('assets/cuteboing.wav');
        this.moleBoing.volume = 0.6;
        this.moleHit = new Audio('assets/molehit.wav')
        this.moleHit.volume = 0.4;
        this.gameTheme = new Audio('assets/creepy-devil-dance-166764.mp3')
        this.gameTheme.volume = 0.2;
    }

    //sounds are being defined here in AudioController but not being called anywhere yet
    playMoleBoing() {
        this.moleBoing.play();
    }

    playMoleHit() {
        this.moleHit.play();
    }

    playgameTheme() {
        this.gameTheme.play();
    }


} //end of AudioController class

//javascript method that looks for anything with the class name square
//and then stores the file as variable squares
const squares = document.querySelectorAll('.square');

//using document.querySelector instead of all because there's only one mole
//at a time
const mole = document.querySelector('.mole');

//when searching for an element with an ID, we use a hashtag
const timeLeft = document.querySelector('#time-left');

const score = document.querySelector('#score');

//global variables
let result = 0;
let hitPosition;
let currentTime = 30; //set to 30 usually
let timerId = null;

//bringing the audio controller so it can be used below?
this.audioController = new AudioController;

//getting each square and for each of the squares, we're removing the class of mole
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole') //removing this line causes the mole to stay in place each time he comes up
        //playing a mole boing sound each time a mole comes up
        this.audioController.playMoleBoing();
    })

    //starting game theme? TODO need to tie to button and stop at game over
    this.audioController.gameTheme.play();

    //going into squares array and passing in a square number
    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    //console.log(randomSquare); spits out a random position for the mole

    hitPosition = randomSquare.id
}

//for each id in the square, we are going to grab the ID, add an event listener
//to listen out if we put mouse down and click on the square
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
          result++;
          this.audioController.playMoleHit();
          score.textContent = result;
          hitPosition = null;  
        }
    })
})

//lights up a random square every 500ms with a mole
//can be attached to a button and can stop or start mole
function moveMole() {
    timerId = setInterval(randomSquare, 500)
    
}

//moving this line inside of the ready function to move after the overlay is clicked
//moveMole();

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;

    //if game ends, display to user game over and include score
    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        //document.getElementById('game-over-text').classList.add('visible') - can figure out how to put score in and restart later
        alert('GAME OVER! Your final score is ' + result);
        location.reload(); //resets the game score and timer!
    }

}

//moving this line inside the ready function to trigger after the player hits the overlay. setting to null for now until overlay is triggered
let countDownTimerId = null;

//adding in a ready function that should clear the overlay when clicked
//TODO: tie timer in here, and make a startGame()function, and put a mole function here to start moles only after overlay is clicked and not before
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    //let game = new WhacAMole(100, cards); TODO: need to create a constructor and tie timer to it along with moles instead of cards

    //forEach overlay, we're going to add an event listener and do everything in the braces
    overlays.forEach(overlay =>
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            moveMole();
            let countDownTimerId = setInterval(countDown, 1000)
            //game.startGame(); TODO: make startGame function 
        })
    )

} //end of ready function. may need to adjust bracket and parentheses here if something isn't working.


//if html page has not finished loading, put an event listener on the DOM that says when it is loaded, call ready. if not, we already know the page is loaded so call ready.
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}