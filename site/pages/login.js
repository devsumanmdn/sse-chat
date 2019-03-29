import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';
import { connect } from 'react-redux';

import Form from '../src/components/styled/Form';
import Heading from '../src/components/styled/Heading';
import { login as loginAction } from '../redux/auth/authActions';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const login = ({ loginUser, auth: { loggingIn, loginError } }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(true);
  return (
    <Layout>
      <Form>
        <Heading>Login</Heading>
        <TextField
          type={'text'}
          name={'usernameOrEmail'}
          value={usernameOrEmail}
          onFocus={() => setShowError(false)}
          onChange={e => setUsernameOrEmail(e.target.value)}
          variant={'outlined'}
          label={'Username or email'}
        />
        <TextField
          type={'password'}
          name={'password'}
          value={password}
          onFocus={() => setShowError(false)}
          onChange={e => setPassword(e.target.value)}
          variant={'outlined'}
          label={'Password'}
        />
        <div>
          <Button
            variant={'outlined'}
            color={'primary'}
            fullWidth
            onClick={() => {
              setShowError(true);
              loginUser({ usernameOrEmail, password });
            }}
          >
            {loggingIn ? <CircularProgress size={18} /> : 'Login'}
          </Button>
          <p>
            New here?{' '}
            <Link href={'/signup'}>
              <a>Signup</a>
            </Link>
            instead
          </p>
          {showError && loginError && (
            <p style={{ color: '#d22' }}>{loginError}</p>
          )}
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  loginUser: loginAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
