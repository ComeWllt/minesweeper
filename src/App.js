import React, { Component } from 'react';
import { Segment, Container, Transition } from 'semantic-ui-react';

import createBoard from './functions/createBoard';

import AllRows from './components/AllRows';
import TopHeader from './components/TopHeader';


class App extends Component {

  constructor(props) {
    super(props);
    this.rowNumber = 9;
    this.columnNumber = 9;
    this.bombNumber = 15;
    this.state = {
      history: [
        createBoard(this.rowNumber, this.columnNumber, this.bombNumber)
      ],
      won: false,
      lost: false,
      revealedCount: 0,
      remainingFlags: this.bombNumber,
      flagAnimation: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleClick(row, column) {
    const { history, won, lost, revealedCount } = this.state;
    const board = history[history.length-1];
    const hiddenCount = this.rowNumber * this.columnNumber - (revealedCount+1);
    if ((board[row][column]['status']!=='hidden') || lost || won) {
      return;
    }
    board[row][column]['status']='revealed';
    history.push(board);
    this.setState({
      history: history
    });
    if (board[row][column]['bomb']) {
      this.setState({
        lost: true
      });
    } else if (hiddenCount === this.bombNumber) {
      this.setState({
        won: true
      });
    }
    this.setState({
      revealedCount: revealedCount + 1
    });
  }

  handleRightClick(e, row, column) {
    e.preventDefault();
    const { history, won, lost, remainingFlags, flagAnimation } = this.state;    
    const board = history[history.length-1];
    if (
      (board[row][column]['status']==='revealed') 
      || lost 
      || won 
    ) {
      return;
    }
    if (remainingFlags===0 && board[row][column]['status']!=='marked') {
      this.setState({
        flagAnimation: !flagAnimation
      });
      return;
    }
    if (board[row][column]['status']==='hidden') {
      board[row][column]['status']='marked';
      this.setState({
        remainingFlags: remainingFlags - 1
      });
    } else if (board[row][column]['status']==='marked') {
      board[row][column]['status']='hidden';
      this.setState({
        remainingFlags: remainingFlags + 1
      });
    }
    history.push(board);
    this.setState({
      history: history
    });
  }

  handleNewGame() {
    const { flagAnimation } = this.state;
    const newBoard = createBoard(this.rowNumber, this.columnNumber, this.bombNumber);
    this.setState({
      history: [
        newBoard
      ],
      won: false,
      lost: false,
      revealedCount: 0,
      remainingFlags: this.bombNumber,
      flagAnimation: flagAnimation,
    });
  }

  render() {
    const { history, won, lost, remainingFlags, flagAnimation } = this.state;
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
            newGame={this.handleNewGame}/>
          <Transition 
            visible={lost || won} 
            mountOnShow={false} 
            animation={animation} 
            duration={500}
          >
            <div>
              <AllRows 
                board={history[history.length-1]} 
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
