const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const car = [
    'audi',
    'ferrari',
    'gt40',
    'lancia',
    'm3',
    'mazda',
    'mclaren',
    'Mercedes',
    'Peugeot',
    'porsche',
    'r32',
    'supra'
];

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }
  
  let firstCard = '';
  let secondCard = '';
  
function checkEndGame() {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 24) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos.`);
    }
}
  
let isChecking = false;

function checkCards() {
    if (isChecking) return;
    isChecking = true;

    const firstCar = firstCard.getAttribute('data-car');
    const secondCar = secondCard.getAttribute('data-car');

    if (firstCar === secondCar) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }

    setTimeout(() => {
        isChecking = false;
    }, 600);
};
  
function revealCard ({ target }){
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (target.parentNode == firstCard) {
      return;
    }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}
  
function createCard(car) {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../assets/img/${car}.jpeg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-car', car)

  return card;
}

function loadGame(){
  const duplicatecar = [...car, ...car];

  const shuffledArray = duplicatecar.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((car) => {
    const card = createCard(car);
    grid.appendChild(card);
  });
}

function startTimer() {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
