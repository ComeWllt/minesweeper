import React, { Component } from 'react';
import { Button, Segment, Container } from 'semantic-ui-react';

import staticBoard from './staticBoard';

import PropTypes from 'prop-types';


function Square(props) {
  return (
    <Button color={props.color} icon>
      {props.value}
    </Button>
  );
}

Square.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
};

function Row(props) {
  const row = props.row.map((element, index) => {
    const color = element.bomb ? 'red' : null;
    return(<Square color={color} value={element.neighbours} key={index.toString()}/>);
  });
  return (
    <Button.Group size='small'>
      {row}
    </Button.Group>
  );
}

Row.propTypes = {
  row: PropTypes.array,
};

function Columns() {
  const columns = staticBoard.map((row, index) => {
    return(
      <div key={index.toString()}>
        <Row row={row}/>
      </div>
    );
  });
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
          <Columns/>
        </Segment>
      </Container>
    );
  }
}

export default Board;
