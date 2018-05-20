import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';


class Square extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      return true;
    }
    if (this.props.lost !== nextProps.lost && this.props.bomb) {
      return true;
    }
    return false;
  }

  render() {
    const color = this.props.status !== 'revealed' ? 'red' : null;
    let content;
    if (this.props.bomb && this.props.lost) {
      content = (<Icon style={{margin: '0'}} color={'black'} name='bomb'/>);
    } else if (this.props.status === 'hidden') {
      content = (<Icon style={{margin: '0'}} size='small' name='circle outline'/>);
    } else if (this.props.status === 'marked') {
      content = (<Icon style={{margin: '0'}} inverted color={'yellow'} name='flag'/>);
    } else if (this.props.bomb) {
      content = (<Icon style={{margin: '0'}} color={'black'} name='bomb'/>);
    } else if (this.props.neighbours === 0) {
      content = (<div style={{color:'black'}}></div>);
    } else {
      content = (<div style={{color:'black'}}>{this.props.neighbours}</div>);
    }
    return (
      <Button 
        inverted
        active={this.props.status !== 'revealed'}
        style={{height: '30px', width: '30px', padding: '0',
          border: 'solid', borderColor: '#ff5144', borderRadius: '0', borderWidth: '1px'}} 
        color={color}
        onClick={() => this.props.buttonClick(this.props.rowId, this.props.columnId)}
        onContextMenu={(e) => this.props.buttonRightClick(e, this.props.rowId, this.props.columnId)}
      >
        {content}
      </Button>
    );
  }
}

Square.propTypes = {
  status: PropTypes.string,
  neighbours: PropTypes.number,
  bomb: PropTypes.bool,
  buttonClick: PropTypes.func,
  buttonRightClick: PropTypes.func,
  rowId: PropTypes.number,
  columnId: PropTypes.number,
  lost: PropTypes.bool,
};


export default Square;
