
function createBoard(rowNumber, columnNumber, bombNumber) {

  let board = Array(rowNumber)
    .fill()
    .map(() => createRow(columnNumber));

  for (let k = 0; k < bombNumber; k++) {
    addBomb(board, rowNumber, columnNumber);
  }

  return(board);

}


function createRow(columnNumber) {

  let row = Array(columnNumber)
    .fill()
    .map(() => {
      return({
        status: 'hidden',
        bomb: false,
        neighbours: 0,
      });
    });

  return(row);
}


function addBomb(board, rowNumber, columnNumber) {

  const i = Math.floor(Math.random() * rowNumber);
  const j = Math.floor(Math.random() * columnNumber); 
  if (board[i][j]['bomb'] === true) {
    return(addBomb(board, rowNumber, columnNumber));
  }
  else {
    board[i][j]['bomb'] = true;
    increaseNeighboursValues(board, rowNumber, columnNumber, i, j);
  }
}


function increaseNeighboursValues(board, rowNumber, columnNumber, i, j) {
  if (i === 0 && j === 0) {
    board[i][j+1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i+1][j+1]['neighbours'] += 1;
  } else if (i === 0 && j === columnNumber-1) {
    board[i][j-1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i+1][j-1]['neighbours'] += 1;
  } else if (i === rowNumber-1 && j === 0) {
    board[i-1][j]['neighbours'] += 1;
    board[i][j+1]['neighbours'] += 1;
    board[i-1][j+1]['neighbours'] += 1;
  } else if (i === rowNumber-1 && j === columnNumber-1) {
    board[i][j-1]['neighbours'] += 1;
    board[i-1][j]['neighbours'] += 1;
    board[i-1][j-1]['neighbours'] += 1;
  } else if (i === 0) {
    board[i][j+1]['neighbours'] += 1;
    board[i][j-1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i+1][j+1]['neighbours'] += 1;
    board[i+1][j-1]['neighbours'] += 1;
  } else if (j === 0) {
    board[i][j+1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i-1][j]['neighbours'] += 1;
    board[i+1][j+1]['neighbours'] += 1;
    board[i-1][j+1]['neighbours'] += 1;
  } else if (i === rowNumber-1) {
    board[i][j+1]['neighbours'] += 1;
    board[i][j-1]['neighbours'] += 1;
    board[i-1][j]['neighbours'] += 1;
    board[i-1][j-1]['neighbours'] += 1;
    board[i-1][j+1]['neighbours'] += 1;
  } else if (j === columnNumber-1) {
    board[i][j-1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i-1][j]['neighbours'] += 1;
    board[i-1][j-1]['neighbours'] += 1;
    board[i+1][j-1]['neighbours'] += 1;
  } else {
    board[i][j+1]['neighbours'] += 1;
    board[i][j-1]['neighbours'] += 1;
    board[i+1][j]['neighbours'] += 1;
    board[i-1][j]['neighbours'] += 1;
    board[i+1][j+1]['neighbours'] += 1;
    board[i-1][j-1]['neighbours'] += 1;
    board[i-1][j+1]['neighbours'] += 1;
    board[i+1][j-1]['neighbours'] += 1;
  }
}


export default createBoard;
