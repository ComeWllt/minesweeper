import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Transition, Label } from 'semantic-ui-react';


class Flags extends PureComponent {

  render() {
    return (
      <Transition 
        visible={this.props.flagAnimation} 
        mountOnShow={false} 
        animation='bounce'
        duration={500}
      >
        <Label color='yellow'>
          <Icon name='flag' /> {this.props.remainingFlags}
        </Label>
      </Transition>
    );
  }
}

Flags.propTypes = {
  flagAnimation: PropTypes.bool,
  remainingFlags: PropTypes.number,
};


export default Flags;
