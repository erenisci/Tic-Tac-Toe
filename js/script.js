// Select the elements
const player = document.querySelector('.player');
const hidden = document.querySelector('.hidden');
const gridsAll = document.querySelectorAll('.grids');
const playAgain = document.querySelector('.again');

// Check the current status - Horizontal, vertical and diagonal
function checkWin(gridIndexes, symbol) {
  if (
    (gridIndexes[0] === symbol && gridIndexes[1] === symbol && gridIndexes[2] === symbol) ||
    (gridIndexes[3] === symbol && gridIndexes[4] === symbol && gridIndexes[5] === symbol) ||
    (gridIndexes[6] === symbol && gridIndexes[7] === symbol && gridIndexes[8] === symbol) ||
    (gridIndexes[0] === symbol && gridIndexes[3] === symbol && gridIndexes[6] === symbol) ||
    (gridIndexes[1] === symbol && gridIndexes[4] === symbol && gridIndexes[7] === symbol) ||
    (gridIndexes[2] === symbol && gridIndexes[5] === symbol && gridIndexes[8] === symbol) ||
    (gridIndexes[0] === symbol && gridIndexes[4] === symbol && gridIndexes[8] === symbol) ||
    (gridIndexes[2] === symbol && gridIndexes[4] === symbol && gridIndexes[6] === symbol)
  )
    return true;
  else return false;
}

// Changes the content of the page
function contentChange() {
  playAgain.disabled = false;
  playAgain.classList.add('hover');
  playAgain.style.color = '#332f1f';
  hidden.textContent = theWinner;
  hidden.style.display = 'block';
}

// Play again button
playAgain.addEventListener('click', function () {
  // If again button is not disable reset everything to start position
  gridsAll.forEach(
    item => ((item.textContent = ''), (item.style.backgroundColor = '#ffec99'), (item.style.pointerEvents = 'auto'))
  );
  currentPlayer = 'X';
  player.textContent = currentPlayer;
  playAgain.classList.remove('hover');
  playAgain.style.color = '#21252940';
  playAgain.disabled = true;
  hidden.textContent = '';
  hidden.style.display = 'none';
});

// Current Player - Starts with 'X'
let currentPlayer = player.textContent;

// Pick every index of grid
let gridIndexes = [];
gridsAll.forEach(item => gridIndexes.push(item.textContent));

// Disable the button until the game ends && String of winner && Hover effect
playAgain.classList.remove('hover');
playAgain.disabled = true;
let theWinner = '';

// Add functionality to grids - As a main function
gridsAll.forEach(grid =>
  grid.addEventListener('click', function () {
    // Click and push in the array if the grid is empty
    if (grid.textContent === '') {
      gridIndexes = [];
      grid.textContent = currentPlayer;
      gridsAll.forEach(item => gridIndexes.push(item.textContent));
      grid.style.backgroundColor = '#ffe066';

      // If someone wins display the winner block on the top and disable click event
      if (checkWin(gridIndexes, currentPlayer)) {
        theWinner = currentPlayer + ' Wins!';
        contentChange();
        gridsAll.forEach(item => ((item.style.backgroundColor = '#ffe066'), (item.style.pointerEvents = 'none')));
      }

      // If no one wins and all the grids are empty display the draw block on the top
      else if (!gridIndexes.includes('')) {
        theWinner = 'Draw!';
        contentChange();
      }

      // If no conditions and if the currentPlayer = 'X' change it to 'O' and display
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      player.textContent = currentPlayer;
    }
  })
);
