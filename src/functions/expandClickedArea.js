
// Return a new board with the new revealed squares, and a count of the revealed squares.

function expandClickedArea(board, row, column) {

  const rowNumber = board.length;
  const columnNumber = board[0].length;

  const count = recursiveExpansion(board, row, column, columnNumber, rowNumber);

  return({board: board, count: count});
}

// Recursively expand the area if the player clicked on a 'blank' square (next to 0 bomb).
// Checking (board[i][j]['status']==='revealed') prevents from treating the same square several times.

function recursiveExpansion(board, i, j, columnNumber, rowNumber) {

  let count = 0;

  if (board[i][j]['neighbours'] !== 0 || board[i][j]['status']==='revealed' || board[i][j]['bomb']) {
    board[i][j]['status']='revealed';
    return(1);
  }

  board[i][j]['status']='revealed';
  count += 1;

  try{
    if (board[i][j+1]['status'] === 'hidden') { count += recursiveExpansion(board, i, j+1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i][j-1]['status'] === 'hidden') { count += recursiveExpansion(board, i, j-1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i+1][j]['status'] === 'hidden') { count += recursiveExpansion(board, i+1, j, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i-1][j]['status'] === 'hidden') { count += recursiveExpansion(board, i-1, j, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i+1][j+1]['status'] === 'hidden') { count += recursiveExpansion(board, i+1, j+1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i-1][j-1]['status'] === 'hidden') { count += recursiveExpansion(board, i-1, j-1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i-1][j+1]['status'] === 'hidden') { count += recursiveExpansion(board, i-1, j+1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  try{
    if (board[i+1][j-1]['status'] === 'hidden') { count += recursiveExpansion(board, i+1, j-1, columnNumber, rowNumber); }
  }
  catch(e) {
    //pass
  }
  
  return(count);
}


export default expandClickedArea;
