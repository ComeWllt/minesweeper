import React from 'react';
import { Button } from 'semantic-ui-react';

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


export default Square;
