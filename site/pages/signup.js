import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from '../src/components/styled/Form';
import Heading from '../src/components/styled/Heading';
import { signup as signupAction } from '../redux/auth/authActions';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const signup = ({ signupUser, auth: { signingUp, signupError } }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const textFieldProps = {
    margin: 'dense',
    variant: 'outlined'
  };

  const handleSubmit = () => {
    const data = {
      name,
      username,
      email,
      password
    };
    signupUser(data);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <Heading>Signup</Heading>
        <TextField
          type={'text'}
          name={'name'}
          value={name}
          onChange={e => setName(e.target.value)}
          label={'Name'}
          {...textFieldProps}
        />
        <TextField
          type={'email'}
          name={'email'}
          value={email}
          onChange={e => setEmail(e.target.value)}
          label={'Email'}
          {...textFieldProps}
        />
        <TextField
          type={'text'}
          name={'userName'}
          value={username}
          onChange={e => setUsername(e.target.value)}
          label={'Username'}
          {...textFieldProps}
        />
        <TextField
          type={'password'}
          name={'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          label={'Password'}
          {...textFieldProps}
        />
        <div>
          <Button
            onClick={handleSubmit}
            variant={'outlined'}
            fullWidth
            color={'primary'}
          >
            {signingUp ? <CircularProgress size={'16'} /> : 'Signup'}
          </Button>
          <p>
            Already a user,{' '}
            <Link href={'/login'}>
              <a>Login</a>
            </Link>{' '}
            instead
          </p>
          {signupError && <p>signupError</p>}
        </div>
      </Form>
    </Layout>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signupUser: signupAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signup);
