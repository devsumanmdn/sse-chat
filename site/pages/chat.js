import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import ChatBody from '../src/components/chat/ChatBody';
import ChatFooter from '../src/components/chat/ChatFooter';
import ChatHeader from '../src/components/chat/ChatHeader';
import eventSourceInit from '../services/sseService';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { auth } = this.props;
    if (auth.isLoggedIn) {
      eventSourceInit();
    }
  };

  render() {
    const { classes, auth } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </div>
    );
  }
}

chat.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default withStyles(styles)(connect(mapStateToProps)(chat));
