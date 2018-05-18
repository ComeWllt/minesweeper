import React from 'react';
import { Button } from 'semantic-ui-react';

import PropTypes from 'prop-types';


function Square(props) {
  return (
    <Button color={props.color} onClick={() => props.buttonClick(props.rowId, props.columnId)}>
      {props.value}
    </Button>
  );
}

Square.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  buttonClick: PropTypes.func,
  rowId: PropTypes.number,
  columnId: PropTypes.number,
};


export default Square;
