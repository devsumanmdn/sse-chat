import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {}
};

class ChatFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>ChatFooter</h1>
      </div>
    );
  }
}

ChatFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ChatFooter);
