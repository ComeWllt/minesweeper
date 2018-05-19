import React, { Component } from 'react';
import { Segment, Container, Transition } from 'semantic-ui-react';

import staticBoard from './functions/staticBoard';

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
    this.handleReloadGame = this.handleReloadGame.bind(this);
  }

  handleClick(row, column) {
    const history = this.state.history;
    const board = history[history.length-1];
    const lost = this.state.lost;
    const won = this.state.won;
    const revealedCount = this.state.revealedCount;
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
    const history = this.state.history;
    const board = history[history.length-1];
    const lost = this.state.lost;
    const won = this.state.won;
    const remainingFlags = this.state.remainingFlags;
    if (
      (board[row][column]['status']==='revealed') 
      || lost 
      || won 
    ) {
      return;
    }
    if (remainingFlags===0 && board[row][column]['status']!=='marked') {
      const flagAnimation = this.state.flagAnimation;
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

  handleReloadGame() {
    console.log('reload button triggered');
  }

  render() {
    const history = this.state.history;
    const lost = this.state.lost;
    const won = this.state.won;
    const remainingFlags = this.state.remainingFlags;
    const flagAnimation = this.state.flagAnimation;
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <TopHeader 
            remainingFlags={remainingFlags} 
            flagAnimation={flagAnimation} 
            won={won} lost={lost}
            reloadGame={this.handleReloadGame}/>
          <Transition 
            visible={lost || won} 
            mountOnShow={false} 
            animation={won ? 'flash' : 'shake'} 
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
