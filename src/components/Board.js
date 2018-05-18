import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';

import staticBoard from './staticBoard';

import Columns from './Columns';


class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        staticBoard
      ]
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonRightClick = this.handleButtonRightClick.bind(this);
  }

  handleButtonClick(row, column) {
    const history = this.state.history;
    const board = history[history.length-1];
    if (board[row][column]['status']!=='hidden') {
      return;
    }
    board[row][column]['status']='revealed';
    history.push(board);
    this.setState({
      history: history
    });
  }

  handleButtonRightClick(e, row, column) {
    e.preventDefault();
    const history = this.state.history;
    const board = history[history.length-1];
    if (board[row][column]['status']==='revealed') {
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
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <Columns 
            board={history[history.length-1]} 
            buttonClick={this.handleButtonClick}
            buttonRightClick={this.handleButtonRightClick}
          />
        </Segment>
      </Container>
    );
  }
}


export default Board;
