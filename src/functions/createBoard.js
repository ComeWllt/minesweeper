
// Create a board of dimensions (rowNumber*columnNumber) filled with (bombNumber) bombs.

function createBoard(rowNumber, columnNumber, bombNumber) {

  let board = Array(rowNumber)
    .fill()
    .map(() => createRow(columnNumber));

  for (let k = 0; k < bombNumber; k++) {
    addBomb(board, rowNumber, columnNumber);
  }

  return(board);

}

// Create a row of the board filled with default values.

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

// Add the bombs to the board

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

// Update the value 'neighbours' of squares which are next to a bomb.

function increaseNeighboursValues(board, rowNumber, columnNumber, i, j) {
  try{
    board[i][j+1]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i][j-1]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i+1][j]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i-1][j]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i+1][j+1]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i-1][j-1]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i-1][j+1]['neighbours'] += 1;
  }
  catch(e) {
    //pass
  }
  try{
    board[i+1][j-1]['neighbours'] + 1;
  }
  catch(e) {
    //pass
  }
}


export default createBoard;
