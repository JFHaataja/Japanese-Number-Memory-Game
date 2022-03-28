const startButton = document.getElementById("startButton");
const gamePanel = document.getElementById("gamePanel");
const gameDescriptionPanel = document.getElementById("gameDescriptionPanel");
const scored = document.getElementById("scored");
const mistaken = document.getElementById("mistaken");

const japaneseList = returnJapaneseList();

let openedCards = [];
let [scoredPoints,mistakenPoints] = [0,0];

startButton.addEventListener('click', () => changeButtonAndDescription() );

function changeButtonAndDescription(){

    startButton.innerHTML = "<span>Reset Game</span>";
    gameDescriptionPanel.classList.remove("none");

prepareGame();
}

function prepareGame(){
    resetPoints();
    organizeCards(shuffleArray(generateIdsToArray()).slice(0,10));
}

function generateIdsToArray(){
    let ids = japaneseList.map(n => parseInt(n.id));  

return ids;
}

function shuffleArray(list) {
    return list.sort(() => Math.random() - 0.5);
}

function organizeCards(cardIds){
    let arrayOfCards = [];
    let divs = "";
  
    cardIds.forEach((item) => {
      arrayOfCards.push(`<div class="cards col-md-2 cards-lower" data-nihongo="${japaneseList[item].id}">
      <div>${japaneseList[item].kanji}</div><div></br>${japaneseList[item].english}</div></div>`);
      arrayOfCards.push(`<div class="cards col-md-2 cards-lower" data-nihongo="${japaneseList[item].id}">
      <div>${japaneseList[item].hiragana}</div><div></br>${japaneseList[item].english}</div></div>`);
    })
  
    shuffleArray(arrayOfCards).map(el => divs += el );
  
    gamePanel.innerHTML = divs;
  
    startGameForReal();
  }

  function startGameForReal(){
    const cards = document.querySelectorAll('.cards');
  
    cards.forEach(card => card.addEventListener('click', faceUpCards));
  }
  
  function faceUpCards() {
    openedCards.push(this);
  
    if(openedCards.length === 2){
      gamePanel.classList.add("blocked");
      checkForMatches();
    }
  
    faceDownCards(this);
  }

  function checkForMatches(){
    (openedCards[0].dataset.nihongo === openedCards[1].dataset.nihongo) 
    ? match() :  unmatch()
}

function match(){
  Array.prototype.filter.call(openedCards, openedCards => openedCards.classList.add('matched'))
  gamePanel.classList.remove("blocked");
  openedCards = [];
  setPoints('score');
}

function unmatch(){
  setTimeout(() =>{
  Array.prototype.filter.call(openedCards, openedCards => faceDownCards(openedCards))
  gamePanel.classList.remove("blocked");
  openedCards = []},2200);
  setPoints('mistake');
  
}

function faceDownCards(allCards){
    allCards.classList.toggle('flip');
    allCards.classList.toggle('blocked');
    allCards.classList.toggle('cards-lower');
    startButton.classList.toggle('blocked');
  }
  
  function setPoints(type){
    if(type == 'score'){
      scoredPoints++;
      scored.textContent = scoredPoints;
  
        if(scoredPoints === 10){
          gamePanel.innerHTML =  congratulationsDiv();
        }
  
    }else{
      mistakenPoints++;
      mistaken.textContent = mistakenPoints;
    } 
  }

  function resetPoints(){
    [scoredPoints,mistakenPoints] = [0,0];
    scored.textContent = 0;
    mistaken.textContent = 0;
  }
  
  function congratulationsDiv(){
    return `<div class="congratulations">
      <h1>Thank you for playing this mini game! &#127881;</h1>
      <p>If you want to play again, press reset button above.
    `;
  }