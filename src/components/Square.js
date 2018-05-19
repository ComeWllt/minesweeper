import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';


function Square(props) {
  const color = props.element.status !== 'revealed' ? 'red' : null;
  let content;
  if (props.element.bomb && props.lost) {
    content = (<Icon color={'black'} size='large' name='bomb'/>);
  } else if (props.element.status === 'hidden') {
    content = (<Icon name='circle outline'/>);
  } else if (props.element.status === 'marked') {
    content = (<Icon inverted color={'yellow'} size='large' name='flag'/>);
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
      active={props.element.status !== 'revealed'}
      style={{height: '52px', width: '52px', borderRadius: '0'}} 
      color={color}
      onClick={() => props.buttonClick(props.rowId, props.columnId)}
      onContextMenu={(e) => props.buttonRightClick(e, props.rowId, props.columnId)}
    >
      {content}
    </Button>
  );
}

Square.propTypes = {
  element: PropTypes.object,
  buttonClick: PropTypes.func,
  buttonRightClick: PropTypes.func,
  rowId: PropTypes.number,
  columnId: PropTypes.number,
  lost: PropTypes.bool,
};


export default Square;
