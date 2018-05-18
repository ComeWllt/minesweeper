import React from 'react';
import { Button } from 'semantic-ui-react';

import Square from './Square';

import PropTypes from 'prop-types';


function Row(props) {
  const row = props.row.map((element, index) => {
    return(
      <Square 
        element={element} 
        rowId={props.rowId}
        columnId={index}
        key={element.key} 
        buttonClick={props.buttonClick}/>);
  });
  return (
    <Button.Group size='medium'>
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
