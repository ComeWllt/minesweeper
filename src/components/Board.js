import React, { Component } from 'react';
import { Segment, Container, Transition, Header, Icon } from 'semantic-ui-react';

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
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonRightClick = this.handleButtonRightClick.bind(this);
  }

  handleButtonClick(row, column) {
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

  handleButtonRightClick(e, row, column) {
    e.preventDefault();
    const history = this.state.history;
    const board = history[history.length-1];
    const lost = this.state.lost;
    const won = this.state.won;
    if ((board[row][column]['status']==='revealed') || lost || won) {
      return;
    }
    if (board[row][column]['status']==='hidden') {
      board[row][column]['status']='marked';
    } else if (board[row][column]['status']==='marked') {
      board[row][column]['status']='hidden';
    }
    history.push(board);
    this.setState({
      history: history
    });
  }

  render() {
    const history = this.state.history;
    const lost = this.state.lost;
    const won = this.state.won;
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
          <Header as='h2' textAlign='center'>
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
                buttonClick={this.handleButtonClick}
                buttonRightClick={this.handleButtonRightClick}
              />
            </div>
          </Transition>
        </Segment>
      </Container>
    );
  }
}


export default Board;
