import React from 'react';
import { Button } from 'semantic-ui-react';

import Square from './Square';

import PropTypes from 'prop-types';


function Row(props) {
  const row = props.row.map((element, index) => {
    const color = element.bomb ? 'red' : null;
    return(
      <Square 
        color={color} 
        value={element.neighbours} 
        rowId={props.rowId}
        columnId={index}
        key={element.key} 
        buttonClick={props.buttonClick}/>);
  });
  return (
    <Button.Group size='small'>
      {row}
    </Button.Group>
  );
}

Row.propTypes = {
  row: PropTypes.array,
  buttonClick: PropTypes.func,
  rowId: PropTypes.number,
};


export default Row;
