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
  }

  render() {
    const history = this.state.history;
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <Columns board={history[history.length-1]}/>
        </Segment>
      </Container>
    );
  }
}

export default Board;
