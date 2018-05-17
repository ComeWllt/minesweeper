import React, { Component } from 'react';
import { Button, Segment, Container } from 'semantic-ui-react';

import PropTypes from 'prop-types';


function Square(props) {
  return (
    <Button icon>
      {props.name}
    </Button>
  );
}

Square.propTypes = {
  name: PropTypes.number,
};

function Row(props) {
  const row = [];
  for (let i = props.n*10; i < props.n*10+9; i++) {
    row.push(<Square name={i} key={i}/>);
  }
  return (
    <Button.Group basic size='small'>
      {row}
    </Button.Group>
  );
}

Row.propTypes = {
  n: PropTypes.number,
};

const columns = [];
for (let i = 1; i < 10; i++) {
  columns.push(
    <div key={i}>
      <Row n={i}/>
    </div>
  );
}

function Squares() {
  return(
    <div>
      {columns}
    </div>
  );
}


class Board extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container textAlign='center'>
        <Segment raised padded>
          <Squares/>
        </Segment>
      </Container>
    );
  }
}

export default Board;
