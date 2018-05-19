import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';


function AllRows(props) {
  const columns = props.board.map((row, index) => {
    return(
      <div key={index}>
        <Row 
          row={row} 
          rowId={index} 
          buttonClick={props.buttonClick}
          buttonRightClick={props.buttonRightClick}
        />
      </div>
    );
  });
  return(
    <div>
      {columns}
    </div>
  );
}

AllRows.propTypes = {
  board: PropTypes.array,
  buttonClick: PropTypes.func,
  buttonRightClick: PropTypes.func,
};


export default AllRows;
