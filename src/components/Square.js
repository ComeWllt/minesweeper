import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';


function Square(props) {
  const color = props.element.status === 'hidden' ? 'red' : null;
  let content;
  if (props.element.status === 'hidden') {
    content = (<Icon size='large' name='circle outline'/>);
  } else if (props.element.bomb) {
    content = (<Icon color={'black'} size='large' name='bomb'/>);
  } else if (props.element.neighbours === 0) {
    content = (<div style={{color:'black'}}></div>);
  } else {
    content = (<div style={{color:'black'}}>{props.element.neighbours}</div>);
  }
  return (
    <Button 
      inverted
      active={props.element.status === 'hidden'}
      style={{height: '55px', width: '55px', borderRadius: '0'}} 
      color={color} 
      onClick={() => props.buttonClick(props.rowId, props.columnId)}
    >
      {content}
    </Button>
  );
}

Square.propTypes = {
  element: PropTypes.object,
  buttonClick: PropTypes.func,
  rowId: PropTypes.number,
  columnId: PropTypes.number,
};


export default Square;
