const board = document.getElementById("chessboard");
const pieces = {
  "R": "♜", "N": "♞", "B": "♝", "Q": "♛", "K": "♚", "P": "♟", // Black
  "r": "♖", "n": "♘", "b": "♗", "q": "♕", "k": "♔", "p": "♙"  // White
};

const initialBoard = [
  "R","N","B","Q","K","B","N","R",
  "P","P","P","P","P","P","P","P",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "p","p","p","p","p","p","p","p",
  "r","n","b","q","k","b","n","r"
];

let selectedSquare = null;
let currentTurn = "white"; // White starts

function createBoard() {
  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    const row = Math.floor(i / 8);
    const col = i % 8;
    square.classList.add((row + col) % 2 === 0 ? "light" : "dark");

    if (initialBoard[i]) {
      square.textContent = pieces[initialBoard[i]];
    }

    square.addEventListener("click", () => handleClick(square));
    board.appendChild(square);
  }
}

function isWhitePiece(symbol) {
  return ["♖","♘","♗","♕","♔","♙"].includes(symbol);
}

function isBlackPiece(symbol) {
  return ["♜","♞","♝","♛","♚","♟"].includes(symbol);
}

function handleClick(square) {
  if (!selectedSquare) {
    // First click: select piece if it's that player's turn
    if (square.textContent !== "") {
      if (currentTurn === "white" && isWhitePiece(square.textContent)) {
        selectedSquare = square;
        square.style.border = "2px solid red";
      } else if (currentTurn === "black" && isBlackPiece(square.textContent)) {
        selectedSquare = square;
        square.style.border = "2px solid red";
      }
    }
  } else {
    // Second click: move piece
    if (square !== selectedSquare) {
      if (square.textContent !== "") {
        // Capture logic
        if (currentTurn === "white" && isBlackPiece(square.textContent)) {
          document.getElementById("capturedBlack").textContent += square.textContent + " ";
        } else if (currentTurn === "black" && isWhitePiece(square.textContent)) {
          document.getElementById("capturedWhite").textContent += square.textContent + " ";
        }
      }
      square.textContent = selectedSquare.textContent;
      selectedSquare.textContent = "";
      // Switch turn
      currentTurn = currentTurn === "white" ? "black" : "white";
      document.getElementById("turnDisplay").textContent = 
        `Turn: ${currentTurn.toUpperCase()}`;
    }
    selectedSquare.style.border = "";
    selectedSquare = null;
  }
}

createBoard();

// Show turn info
const turnInfo = document.createElement("h2");
turnInfo.id = "turnDisplay";
turnInfo.textContent = "Turn: WHITE";
document.body.insertBefore(turnInfo, board);

// Captured pieces display
const capturedDiv = document.createElement("div");
capturedDiv.id = "captured";
capturedDiv.innerHTML = `
  <div class="captured-area">White captured: <span id="capturedWhite"></span></div>
  <div class="captured-area">Black captured: <span id="capturedBlack"></span></div>
`;
document.body.appendChild(capturedDiv);
