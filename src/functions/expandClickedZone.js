
function expandClickedZone(board, row, column) {

  const rowNumber = board.length;
  const columnNumber = board[0].length;

  const count = expand(board, row, column, columnNumber, rowNumber);

  return({board: board, count: count});
}


function expand(board, i, j, columnNumber, rowNumber) {

  let count = 0;

  if (board[i][j]['neighbours'] !== 0 || board[i][j]['status']==='revealed' || board[i][j]['bomb']) {
    board[i][j]['status']='revealed';
    return(1);
  }

  board[i][j]['status']='revealed';
  count += 1;

  if (i===0 && j===0) {
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i+1][j+1]['status'] === 'hidden') { count += expand(board, i+1, j+1, columnNumber, rowNumber); }
  } else if (i===0 && j===columnNumber-1) {
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i+1][j-1]['status'] === 'hidden') { count += expand(board, i+1, j-1, columnNumber, rowNumber); }
  } else if (i===rowNumber-1 && j===0) {
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i-1][j+1]['status'] === 'hidden') { count += expand(board, i-1, j+1, columnNumber, rowNumber); }
  } else if (i===rowNumber-1 && j===columnNumber-1) {
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i-1][j-1]['status'] === 'hidden') { count += expand(board, i-1, j-1, columnNumber, rowNumber); }
  } else if (i===0) {
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i+1][j+1]['status'] === 'hidden') { count += expand(board, i+1, j+1, columnNumber, rowNumber); }
    if (board[i+1][j-1]['status'] === 'hidden') { count += expand(board, i+1, j-1, columnNumber, rowNumber); }
  } else if (j===0) {
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i+1][j+1]['status'] === 'hidden') { count += expand(board, i+1, j+1, columnNumber, rowNumber); }
    if (board[i-1][j+1]['status'] === 'hidden') { count += expand(board, i-1, j+1, columnNumber, rowNumber); }
  } else if (i===rowNumber-1) {
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i-1][j-1]['status'] === 'hidden') { count += expand(board, i-1, j-1, columnNumber, rowNumber); }
    if (board[i-1][j+1]['status'] === 'hidden') { count += expand(board, i-1, j+1, columnNumber, rowNumber); }
  } else if (j===columnNumber-1) {
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i-1][j-1]['status'] === 'hidden') { count += expand(board, i-1, j-1, columnNumber, rowNumber); }
    if (board[i+1][j-1]['status'] === 'hidden') { count += expand(board, i+1, j-1, columnNumber, rowNumber); }
  } else {
    if (board[i][j+1]['status'] === 'hidden') { count += expand(board, i, j+1, columnNumber, rowNumber); }
    if (board[i][j-1]['status'] === 'hidden') { count += expand(board, i, j-1, columnNumber, rowNumber); }
    if (board[i+1][j]['status'] === 'hidden') { count += expand(board, i+1, j, columnNumber, rowNumber); }
    if (board[i-1][j]['status'] === 'hidden') { count += expand(board, i-1, j, columnNumber, rowNumber); }
    if (board[i+1][j+1]['status'] === 'hidden') { count += expand(board, i+1, j+1, columnNumber, rowNumber); }
    if (board[i-1][j-1]['status'] === 'hidden') { count += expand(board, i-1, j-1, columnNumber, rowNumber); }
    if (board[i-1][j+1]['status'] === 'hidden') { count += expand(board, i-1, j+1, columnNumber, rowNumber); }
    if (board[i+1][j-1]['status'] === 'hidden') { count += expand(board, i+1, j-1, columnNumber, rowNumber); }
  }
  return(count);
}


export default expandClickedZone;
