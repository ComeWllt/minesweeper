import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';


class NewGameButton extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Button 
        inverted color='red' circular icon='repeat' 
        onClick={this.props.newGame}
      />
    );
  }
}

NewGameButton.propTypes = {
  newGame: PropTypes.func,
};


export default NewGameButton;
