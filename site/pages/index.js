import React from 'react';
import { connect } from 'react-redux';

const index = ({ auth, friends }) => (
  <div>
    {auth.isLoggedIn ? (
      <h1>{`Hi ${auth.user.name}`}</h1>
    ) : (
      <h1>Hi, to get started please login or signup</h1>
    )}
  </div>
);

const mapStateToProps = ({ auth, friends }) => ({
  auth,
  friends
});

export default connect(mapStateToProps)(index);
