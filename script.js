const cards = [];
const container = document.querySelector('.container');
const lives = document.querySelector('.lives');

const colours = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'violet',
  'magenta',
  'cyan',
  'maroon',
  'brown',
];
let totalCards = 16;
let randomCards = [];
let randomIndex = [];
let correctGuesses = 0;
let count = 5;

lives.innerHTML = count;
let i = 0;
function createCards(numerOfCards) {
  let i = 0;
  for (i = 0; i < totalCards; i++) {
    let card = document.createElement('buton');
    card.classList.add('card');
    card.classList.add('hidden');
    card.dataset.dataid = 0;
    cards.push(card);
  }

  //creating indexes

  const index = [];
  for (i = 0; i < totalCards; i++) {
    index.push(i);
  }

  function shuffleArray(arr) {
    let shuffledArr = arr.slice(); // Make a copy of the original array

    // Loop through the array and swap each element with a random element
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  }

  randomIndex = shuffleArray(index);
  let x = 0;
  let y = 1;
  for (x = 0; x < totalCards; x += 2) {
    let randomId = Math.floor(Math.random() * 900) + 1;
    let randomColor = Math.floor(Math.random() * 899) + 100;
    cards[x].setAttribute('dataid', randomId);
    cards[x].classList.add(colours[y]);
    cards[x + 1].setAttribute('dataid', randomId);
    cards[x + 1].classList.add(colours[y]);
    y++;
  }

  for (x = 0; x < totalCards; x++) {
    randomCards[randomIndex[x]] = cards[x];
  }

  randomCards.forEach((card) => {
    container.appendChild(card);
  });
}

function startGame() {
  const colorCards = document.querySelectorAll('.card');

  let firstCard = undefined;
  let firstCardId = 0;

  let secondCard = undefined;
  let secondCardId = 0;

  function reset() {
    //resetting the card values
    firstCard = undefined;
    firstCardId = 0;

    secondCard = undefined;
    secondCardId = 0;
  }

  function check() {
    if (firstCardId == secondCardId) {
      //disabling the click event if the user matches the card.

      firstCard.removeEventListener('click', start);
      secondCard.removeEventListener('click', start);
      count++;
      lives.innerHTML = count;
      correctGuesses += 2;
      if (correctGuesses == totalCards) {
        alert('Congratulations You won!! :)');
        location.reload();
      }
    } else {
      //changing the colour to default if the user guesses incorrect
      firstCard.classList.add('hidden');
      secondCard.classList.add('hidden');
      count--;
      lives.innerHTML = count;

      if (count < 1) {
        alert('You lose !! :( ');
        location.reload();
      }
    }

    reset();
  }

  function start(event) {
    tempCard = this;
    if (firstCard == undefined) {
      // if first card is not been selected
      firstCard = tempCard;
      firstCard.classList.remove('hidden');
      firstCardId = firstCard.getAttribute('dataid');
    } else {
      secondCard = tempCard;
      secondCard.classList.remove('hidden');
      secondCardId = secondCard.getAttribute('dataid');
      setTimeout(check, 500);
    }
  }

  colorCards.forEach((button) => {
    button.addEventListener('click', start);
  });
}

createCards(totalCards);
startGame();
