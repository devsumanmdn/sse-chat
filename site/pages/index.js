import React from 'react';
import { connect } from 'react-redux';

const index = ({ auth, friends }) => (
  <h1>Hi, to get started please login or signup</h1>
);

const mapStateToProps = ({ auth, friends }) => ({
  auth,
  friends
});

export default connect(mapStateToProps)(index);
