import React, { Component } from 'react';
import { Segment, Container, Transition, Header, Icon, Label, Button } from 'semantic-ui-react';

import staticBoard from './staticBoard';

import Columns from './Columns';


class Board extends Component {

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
    let face;
    if (won) {
      face = (<Icon inverted color='green' name='smile' />);
    } else if (lost) {
      face = (<Icon inverted color='red' name='frown' />);
    } else {
      face = (<Icon inverted color='black' name='meh' />);
    }
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <div>
            <Button 
              inverted color='red' floated='left' circular icon='repeat' 
              onClick={this.handleReloadGame}
            />
            <Header floated='right'>
              <Transition 
                visible={flagAnimation} 
                mountOnShow={false} 
                animation='bounce'
                duration={500}
              >
                <Label floated='right' color='yellow'>
                  <Icon name='flag' /> {(remainingFlags < 10) ? '0' + remainingFlags.toString() : remainingFlags.toString()}
                </Label>
              </Transition>
            </Header>
          </div>
          <Header style={{marginTop: '40px'}} as='h2' textAlign='center'>
            {face}
          </Header>
          <Transition 
            visible={lost || won} 
            mountOnShow={false} 
            animation={won ? 'tada' : 'shake'} 
            duration={500}
          >
            <div>
              <Columns 
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


export default Board;
