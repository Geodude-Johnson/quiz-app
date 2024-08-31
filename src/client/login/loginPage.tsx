import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ invalid, setInvalid] = useState(false);

  // const auth = async () => {
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //     if(response.status === 200) {
  //       navigate('/home');
  //     } else {
  //       setInvalid(true);
  //     }
  //   } catch (error) {
  //     console.log("Error with Authentication:", error);
  //   }
  // }

  function handlePasswordVisibility() {
    const passwordEl = document.getElementById('password');
    const passwordImageEl = document.getElementById('passwordImage');

    if(passwordEl === null || passwordImageEl === null) {
      alert('Password Visability Error');
    } else if(passwordEl.getAttribute('type') === 'password') {
      passwordEl.setAttribute('type', 'text');
      passwordImageEl.setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png')
    } else {
      passwordEl.setAttribute('type', 'password');
      passwordImageEl.setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png')
    }
  }

  type dataCredential = {
    aud: string,
    azp: string,
    email: string,
    email_verified: boolean,
    exp: number,
    family_name: string,
    given_name: string,
    iss: string,
    jti: string,
    name: string,
    nbf: number,
    picture: string,
    sub: string
  }

  const [ user, setUser ] = useState<dataCredential>();
  const [ profile, setProfile ] = useState();

  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
    if(response.credential !== null) {
      const userCredential: dataCredential = jwtDecode(response.credential!);
      console.log('userCredential: ', userCredential);
      setUser(userCredential)
      const { name, email } = userCredential;
    }
  }

  const errorMesssage = () => {
    console.log('An error has occurred with Google OAuth');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [ credentialError, setCredentialError ] = useState(false);

  const handleLogin = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    return isValid;
  };

  return (
    <>
      {invalid ? 
        <>
          <h3>Invalid Credenntials. Please try again</h3>
        </> : null
      }
      <Card variant="outlined">
        {/* <insert our logo here /> */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={credentialError}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={credentialError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              error={credentialError}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={credentialError ? 'error' : 'primary'}
            />
            <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' onClick={handlePasswordVisibility} style={{width: '25px', height: '20px'}}></img>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMesssage}/>
        </Box>
      </Card>
      {/* <div>
        <label htmlFor='email'>Username: </label>
        <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email...'/>
      </div>
      <div>
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password...'/>
        <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' onClick={handlePasswordVisibility} style={{height: '20px', marginLeft: '-25px', marginBottom: '-5px'}}></img>
      </div>
      <button onClick={handleLogin}>Log in</button> */}
    </>
  )
};

export default LoginPage;