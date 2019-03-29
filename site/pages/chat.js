import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  root: {}
};

class chat extends Component {
  render() {
    return <div>hi</div>;
  }
}

chat.propTypes = {
  prop: PropTypes
};

export default withStyles(styles)(chat);
