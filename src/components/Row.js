import React from 'react';
import { Button } from 'semantic-ui-react';

import Square from './Square';

import PropTypes from 'prop-types';


function Row(props) {
  const row = props.row.map((element) => {
    const color = element.bomb ? 'red' : null;
    return(<Square color={color} value={element.neighbours} key={element.key}/>);
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


export default Row;
