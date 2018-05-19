import React, { Component } from 'react';
import { Segment, Container, Transition } from 'semantic-ui-react';

import staticBoard from './functions/staticBoard';
import staticBoard2 from './functions/staticBoard2';

import AllRows from './components/AllRows';
import TopHeader from './components/TopHeader';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        staticBoard
      ],
      won: false,
      lost: false,
      revealedCount: 0,
      remainingFlags: 10,
      flagAnimation: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleClick(row, column) {
    const { history, won, lost, revealedCount } = this.state;
    const board = history[history.length-1];
    const hiddenCount = history[0].length * history[0][0].length - (revealedCount+1);
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
    } else if (hiddenCount === 10) {
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
    this.setState({
      history: [
        staticBoard2
      ],
      won: false,
      lost: false,
      revealedCount: 0,
      remainingFlags: 10,
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
