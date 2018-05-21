import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';


const options = [
  { key: 1, text: 'Beginner', value: 'beginner' },
  { key: 2, text: 'Intermediate', value: 'intermediate' },
  { key: 3, text: 'Expert', value: 'expert' },
];

class LevelChoice extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Form>
        <Form.Dropdown options={options} placeholder='Difficulty' 
          defaultValue={'beginner'}
          onChange={(e, {value}) => this.props.changeLevel(value)}
        />
      </Form>
    );
  }
}

LevelChoice.propTypes = {
  changeLevel: PropTypes.func,
};


export default LevelChoice;
