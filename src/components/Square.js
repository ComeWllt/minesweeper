import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';


function Square(props) {
  const color = props.element.status !== 'revealed' ? 'red' : null;
  let content;
  if (props.element.bomb && props.lost) {
    content = (<Icon style={{margin: '0'}} color={'black'} name='bomb'/>);
  } else if (props.element.status === 'hidden') {
    content = (<Icon style={{margin: '0'}} name='circle outline'/>);
  } else if (props.element.status === 'marked') {
    content = (<Icon style={{margin: '0'}} inverted color={'yellow'} name='flag'/>);
  } else if (props.element.bomb) {
    content = (<Icon style={{margin: '0'}} color={'black'} name='bomb'/>);
  } else if (props.element.neighbours === 0) {
    content = (<div style={{color:'black'}}></div>);
  } else {
    content = (<div style={{color:'black'}}>{props.element.neighbours}</div>);
  }
  return (
    <Button 
      inverted
      active={props.element.status !== 'revealed'}
      style={{height: '40px', width: '40px', padding: '0',
        border: 'solid', borderColor: '#ff5144', borderRadius: '0', borderWidth: '1px'}} 
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
