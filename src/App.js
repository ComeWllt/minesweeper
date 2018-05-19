import React, { Component } from 'react';
import { Segment, Container, Transition } from 'semantic-ui-react';

import createBoard from './functions/createBoard';
import expandClickedZone from './functions/expandClickedZone';

import AllRows from './components/AllRows';
import TopHeader from './components/TopHeader';


class App extends Component {

  constructor(props) {
    super(props);
    this.levels = {
      beginner: {rowNumber: 8, columnNumber: 8, bombNumber: 12},
      intermediate: {rowNumber: 10, columnNumber: 13, bombNumber: 25},
      expert: {rowNumber: 11, columnNumber: 20, bombNumber: 40}
    };
    this.state = {
      board: createBoard(
        this.levels['beginner']['rowNumber'], 
        this.levels['beginner']['columnNumber'],
        this.levels['beginner']['bombNumber']
      ),
      won: false,
      lost: false,
      revealedSquaresCount: 0,
      remainingFlags: this.levels['beginner']['bombNumber'],
      flagAnimation: false,
      rowNumber: this.levels['beginner']['rowNumber'],
      columnNumber: this.levels['beginner']['columnNumber'],
      bombNumber: this.levels['beginner']['bombNumber'],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleClick(row, column) {
    const { board, won, lost, revealedSquaresCount, rowNumber, columnNumber, bombNumber } = this.state;
    const hiddenCount = rowNumber * columnNumber - (revealedSquaresCount+1);
    if ((board[row][column]['status'] !== 'hidden') || lost || won) {
      return;
    }
    const newBoard = expandClickedZone(board, row, column);
    this.setState({
      board: newBoard['board']
    });
    if (board[row][column]['bomb']) {
      this.setState({
        lost: true
      });
    } else if (hiddenCount === bombNumber) {
      this.setState({
        won: true
      });
    }
    this.setState({
      revealedSquaresCount: revealedSquaresCount + newBoard['count']
    });
  }

  handleRightClick(e, row, column) {
    e.preventDefault();
    const { board, won, lost, remainingFlags, flagAnimation } = this.state;    
    if ((board[row][column]['status'] === 'revealed') || lost || won ) {
      return;
    }
    if (remainingFlags === 0 && board[row][column]['status'] !== 'marked') {
      this.setState({
        flagAnimation: !flagAnimation
      });
      return;
    }
    if (board[row][column]['status'] === 'hidden') {
      board[row][column]['status'] = 'marked';
      this.setState({
        remainingFlags: remainingFlags - 1
      });
    } else if (board[row][column]['status'] === 'marked') {
      board[row][column]['status'] = 'hidden';
      this.setState({
        remainingFlags: remainingFlags + 1
      });
    }
    this.setState({
      board: board
    });
  }

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

  handleChangeLevel(level) {
    const { flagAnimation } = this.state;
    const newBoard = createBoard(
      this.levels[level]['rowNumber'], 
      this.levels[level]['columnNumber'],
      this.levels[level]['bombNumber']
    );
    this.setState({
      board: newBoard,
      won: false,
      lost: false,
      revealedSquaresCount: 0,
      remainingFlags: this.levels[level]['bombNumber'],
      flagAnimation: flagAnimation,
      rowNumber: this.levels[level]['rowNumber'],
      columnNumber: this.levels[level]['columnNumber'],
      bombNumber: this.levels[level]['bombNumber'],
    });
  }

  render() {
    const { board, won, lost, remainingFlags, flagAnimation } = this.state;
    let animation;
    if (won) {
      animation = 'flash';
    } else if (lost) {
      animation = 'shake';
    } else {
      animation = null;
    }
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <TopHeader 
            remainingFlags={remainingFlags} 
            flagAnimation={flagAnimation} 
            won={won} lost={lost}
            newGame={this.handleNewGame}
            changeLevel={this.handleChangeLevel}/>
          <Transition 
            visible={lost || won} 
            mountOnShow={false} 
            animation={animation} 
            duration={500}
          >
            <div>
              <AllRows
                lost={lost}
                board={board} 
                buttonClick={this.handleClick}
                buttonRightClick={this.handleRightClick}
              />
            </div>
          </Transition>
        </Segment>
      </Container>
    );
  }
}


export default App;
