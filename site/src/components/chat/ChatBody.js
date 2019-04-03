import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {}
};

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>ChatBody</h1>
      </div>
    );
  }
}

ChatBody.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ChatBody);
