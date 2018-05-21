import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';

import NewGameButton from './TopHeaderComponents/NewGameButton';
import Smiley from './TopHeaderComponents/Smiley';
import Flags from './TopHeaderComponents/Flags';
import LevelChoice from './TopHeaderComponents/LevelChoice';


class TopHeader extends PureComponent {

  render() {
    return (
      <Segment size='huge'>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1} textAlign='left'>
            <NewGameButton newGame={this.props.newGame}/>
          </Grid.Column>
          <Grid.Column width={4} textAlign='left'>
            <LevelChoice changeLevel={this.props.changeLevel}/>
          </Grid.Column>
          <Grid.Column width={6} textAlign='center'>
            <Smiley lost={this.props.lost} won={this.props.won}/>
          </Grid.Column>
          <Grid.Column width={5} textAlign='right'>
            <Flags flagAnimation={this.props.flagAnimation} remainingFlags={this.props.remainingFlags}/>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
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
