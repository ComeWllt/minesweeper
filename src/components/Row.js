import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import Square from './Square';


function Row(props) {
  const row = props.row.map((element, index) => {
    return(
      <Square 
        lost={props.lost}
        element={element} 
        rowId={props.rowId}
        columnId={index}
        key={index} 
        buttonClick={props.buttonClick}
        buttonRightClick={props.buttonRightClick}
      />);
  });
  return (
    <Button.Group size='tiny'>
      {row}
    </Button.Group>
  );
}

Row.propTypes = {
  row: PropTypes.array,
  buttonClick: PropTypes.func,
  buttonRightClick: PropTypes.func,
  rowId: PropTypes.number,
  lost: PropTypes.bool,
};


export default Row;
