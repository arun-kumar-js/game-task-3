// Initialize game variables
const gameBoard = document.getElementById("game-board");
const resetBtn = document.getElementById("reset-btn");
let flippedCards = [];
let matchedCards = [];

// Array of card values (8 pairs)
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to create the game board
function createBoard() {
  // Create a shuffled array with 8 pairs
  const cards = shuffle([...cardValues, ...cardValues]);

  // Clear previous board
  gameBoard.innerHTML = "";

  // Create and append cards
  cards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-value", value);
    card.setAttribute("data-id", index);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Function to handle card flip
function flipCard(event) {
  const card = event.target;

  // If card is already flipped or matched, return
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  // Show the card's value
  card.textContent = card.getAttribute("data-value");
  card.classList.add("flipped");

  // Add to flipped cards array
  flippedCards.push(card);

  // Check for match
  if (flippedCards.length === 2) {
    setTimeout(() => {
      const [card1, card2] = flippedCards;

      if (
        card1.getAttribute("data-value") === card2.getAttribute("data-value")
      ) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
      } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
      }

      flippedCards = [];

      // Check if the game is won
      if (matchedCards.length === 16) {
        alert("Congratulations! You have matched all the cards!");
      }
    }, 1000);
  }
}

// Reset game
resetBtn.addEventListener("click", () => {
  matchedCards = [];
  flippedCards = [];
  createBoard();
});

// Initialize the game board
createBoard();
7