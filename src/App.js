import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';

import createBoard from './functions/createBoard';
import expandClickedArea from './functions/expandClickedArea';

import levels from './config/levels';

import AllRows from './components/AllRows';
import TopHeader from './components/TopHeader';


// This is the main component handling the board state.

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(
        levels['beginner']['rowNumber'], 
        levels['beginner']['columnNumber'],
        levels['beginner']['bombNumber']
      ),
      won: false,
      lost: false,
      revealedSquaresCount: 0,
      remainingFlags: levels['beginner']['bombNumber'],
      flagAnimation: false,
      rowNumber: levels['beginner']['rowNumber'],
      columnNumber: levels['beginner']['columnNumber'],
      bombNumber: levels['beginner']['bombNumber'],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  // Handle a left click on a square according to its status.

  handleClick(row, column) {
    const { board, won, lost, revealedSquaresCount, rowNumber, columnNumber, bombNumber } = this.state;
    if ((board[row][column]['status'] !== 'hidden') || lost || won) {
      return;
    }
    const newBoard = expandClickedArea(board.slice(), row, column);
    this.setState({
      board: newBoard['board'],
      revealedSquaresCount: revealedSquaresCount + newBoard['count']
    });
    if (board[row][column]['bomb']) {
      this.setState({
        lost: true
      });
      return;
    }
    const hiddenCount = rowNumber * columnNumber - (revealedSquaresCount + newBoard['count']);
    if (hiddenCount === bombNumber) {
      this.setState({
        won: true
      });
    }
  }

  // Handle a right click on a square according to its status.

  handleRightClick(e, row, column) {
    e.preventDefault();
    const { board, won, lost, remainingFlags, flagAnimation } = this.state; 
    const newBoard = board.slice();
    if ((newBoard[row][column]['status'] === 'revealed') || lost || won ) {
      return;
    }
    if (remainingFlags === 0 && newBoard[row][column]['status'] !== 'marked') {
      this.setState({
        flagAnimation: !flagAnimation
      });
      return;
    }
    if (newBoard[row][column]['status'] === 'hidden') {
      newBoard[row][column]['status'] = 'marked';
      this.setState({
        board: newBoard,
        remainingFlags: remainingFlags - 1
      });
    } else if (newBoard[row][column]['status'] === 'marked') {
      newBoard[row][column]['status'] = 'hidden';
      this.setState({
        board: newBoard,
        remainingFlags: remainingFlags + 1
      });
    }
  }

  // Launch a new game.

  handleNewGame() {
    const { flagAnimation, rowNumber, columnNumber, bombNumber } = this.state;
    const newBoard = createBoard(rowNumber, columnNumber, bombNumber);
    this.setState({
      board: newBoard,
      won: false,
      lost: false,
      revealedSquaresCount: 0,
      remainingFlags: bombNumber,
      flagAnimation: flagAnimation,
    });
  }

  // Change difficulty and lauch a new game.

  handleChangeLevel(level) {
    const { flagAnimation } = this.state;
    const newBoard = createBoard(
      levels[level]['rowNumber'], 
      levels[level]['columnNumber'],
      levels[level]['bombNumber']
    );
    this.setState({
      board: newBoard,
      won: false,
      lost: false,
      revealedSquaresCount: 0,
      remainingFlags: levels[level]['bombNumber'],
      flagAnimation: flagAnimation,
      rowNumber: levels[level]['rowNumber'],
      columnNumber: levels[level]['columnNumber'],
      bombNumber: levels[level]['bombNumber'],
    });
  }

  render() {
    const { board, won, lost, started, remainingFlags, flagAnimation } = this.state;
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <TopHeader 
            remainingFlags={remainingFlags} 
            flagAnimation={flagAnimation} 
            won={won} lost={lost} started={started}
            newGame={this.handleNewGame}
            changeLevel={this.handleChangeLevel}/>
          <AllRows
            lost={lost}
            board={board} 
            buttonClick={this.handleClick}
            buttonRightClick={this.handleRightClick}
          />
        </Segment>
      </Container>
    );
  }
}


export default App;
