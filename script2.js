// Create an array with 6 fruit images
const images = [
  'apple.png', 'orange.png', 'pineapple.png', 'strawberry.png', 'banana.png', 'cherry.png'
];

// Randomly select 4 images to use in the game
const selectedImages = [];
while (selectedImages.length < 4) {
  const image = images[Math.floor(Math.random() * images.length)];
  if (!selectedImages.includes(image)) {
    selectedImages.push(image);
  }
}

// Create an array with backside images
const backsideImage = [
  'bk.png'
];

const pairs = [];
selectedImages.forEach(selectedImages => {
  pairs.push(selectedImages, selectedImages);
});
pairs.sort(() => Math.random() - 0.5);

// Create a container div for the game and add it to the HTML body
const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
document.body.appendChild(gameContainer);

// Create a card for each image and add it to the game container
pairs.forEach(image => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundImage = `url(${backsideImage})`;
  card.dataset.image = image;
  card.addEventListener('click', handleClick);
  gameContainer.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let wrongGuessCount = 0;
let startTime = null;

function handleClick(event) {
  const card = event.target;
  if (card.classList.contains('clicked') || card.classList.contains('matched')) {
    return;
  }
  card.style.backgroundImage = `url(${card.dataset.image})`;
  card.classList.remove('back');
  card.classList.add('clicked');
  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    if (firstCard.dataset.image === secondCard.dataset.image) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = null;
      secondCard = null;
      if (document.querySelectorAll('.matched').length === pairs.length) {
        const endTime = new Date();
        const duration = endTime - startTime;
        setTimeout(() => alert(`You win! It took you ${duration/1000} seconds with ${wrongGuessCount} mistakes.`), 500);
      }
    } else {
      wrongGuessCount++;
      setTimeout(() => {
        firstCard.style.backgroundImage = `url(${backsideImage})`;
        secondCard.style.backgroundImage = `url(${backsideImage})`;
        firstCard.classList.add('back');
        secondCard.classList.add('back');
        firstCard.classList.remove('clicked');
        secondCard.classList.remove('clicked');
        firstCard = null;
        secondCard = null;
      }, 350);
    }
  }
  if (firstCard && secondCard && !startTime) {
    startTime = new Date();
  }
}