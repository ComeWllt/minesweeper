import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Grid, Transition, Label, Segment, Form } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Beginner', value: 'beginner' },
  { key: 2, text: 'Intermediate', value: 'intermediate' },
  { key: 3, text: 'Expert', value: 'expert' },
];

function TopHeader(props) {
  let face;
  if (props.won) {
    face = (<Icon size='big' inverted color='green' name='smile' />);
  } else if (props.lost) {
    face = (<Icon size='big' inverted color='red' name='frown' />);
  } else {
    face = (<Icon size='big' inverted color='black' name='meh' />);
  }
  return (
    <Segment size='huge'>
      <Grid verticalAlign='middle'>
        <Grid.Column width={1} textAlign='left'>
          <Button 
            inverted color='red' circular icon='repeat' 
            onClick={props.newGame}
          />
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <Form>
            <Form.Dropdown options={options} placeholder='Difficulty' 
              defaultValue={'beginner'}
              onChange={(e, {value}) => props.changeLevel(value)}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={6} textAlign='center'>
          {face}
        </Grid.Column>
        <Grid.Column width={5} textAlign='right'>
          <Transition 
            visible={props.flagAnimation} 
            mountOnShow={false} 
            animation='bounce'
            duration={500}
          >
            <Label color='yellow'>
              <Icon name='flag' /> {props.remainingFlags}
            </Label>
          </Transition>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

TopHeader.propTypes = {
  flagAnimation: PropTypes.bool,
  remainingFlags: PropTypes.number,
  won: PropTypes.bool,
  lost: PropTypes.bool,
  newGame: PropTypes.func,
  changeLevel: PropTypes.func,
};


export default TopHeader;
