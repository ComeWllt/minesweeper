import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Transition } from 'semantic-ui-react';


class Smiley extends PureComponent {

  render() {
    let face;
    let animation;
    let visible=false;
    if (this.props.won) {
      face = (<Icon size='big' inverted color='green' name='smile' />);
      animation='jiggle';
      visible=true;
    } else if (this.props.lost) {
      face = (<Icon size='big' inverted color='red' name='frown' />);
      animation='shake';
      visible=true;
    } else {
      animation=null;
      face = (<Icon size='big' inverted color='black' name='meh' />);
    }
    return (
      <Transition 
        mountOnShow={false} 
        visible={visible}
        animation={animation} 
        duration={500}
      >
        {face}
      </Transition>
    );
  }
}

Smiley.propTypes = {
  won: PropTypes.bool,
  lost: PropTypes.bool,
};


export default Smiley;
