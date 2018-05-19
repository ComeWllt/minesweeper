import React from 'react';
import { Button, Icon, Grid, Transition, Label, Segment } from 'semantic-ui-react';

import PropTypes from 'prop-types';


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
        <Grid.Column width={3} textAlign='left'>
          <Button 
            inverted color='red' circular icon='repeat' 
            onClick={props.reloadGame}
          />
        </Grid.Column>
        <Grid.Column width={10} textAlign='center'>
          {face}
        </Grid.Column>
        <Grid.Column width={3} textAlign='right'>
          <Transition 
            visible={props.flagAnimation} 
            mountOnShow={false} 
            animation='bounce'
            duration={500}
          >
            <Label color='yellow'>
              <Icon name='flag' /> {(props.remainingFlags < 10) ? '0' + props.remainingFlags.toString() : props.remainingFlags.toString()}
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
  reloadGame: PropTypes.func,
};


export default TopHeader;
