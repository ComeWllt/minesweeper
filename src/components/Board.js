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
  }

  handleButtonClick(row, column) {
    const history = this.state.history;
    const board = history[history.length-1];
    board[row][column]['status']='revealed';
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
          <Columns board={history[history.length-1]} buttonClick={this.handleButtonClick}/>
        </Segment>
      </Container>
    );
  }
}


export default Board;
