import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../navBar';

import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

function LoginPage() {
  const navigate = useNavigate();

  const [ username, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ invalid, setInvalid] = useState(false);

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

      // sub is profile specific id
      const { name, email, sub } = userCredential;
      navigate('/')
    }
  }

  const errorMesssage = () => {
    console.log('An error has occurred with Google OAuth');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameEl = document.getElementById('username') as HTMLInputElement;
    const passwordEl = document.getElementById('password') as HTMLInputElement;
    const username = usernameEl.value;
    const password = passwordEl.value;
    console.log({username, password});
    
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if(response.status === 200) {
        navigate('/');
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.log("Error with Authentication:", error);
    }
  };

  const [ credentialError, setCredentialError ] = useState(false);

  // const handleLogin = () => {
  //   const username = document.getElementById('username') as HTMLInputElement;
  //   const password = document.getElementById('password') as HTMLInputElement;

  //   let isValid = true;

    

  //   return isValid;
  // };

  const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(15),
    gap: theme.spacing(10),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

  const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc(100vh - 81px)',
    padding: 20,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  }));

  return (
    <>
      <NavBar />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {/* <insert our logo here /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          {invalid ? 
            <Typography
              sx={{ width: '96%', alignSelf: 'center', backgroundColor: '#FFCDD2', color: 'red', textAlign: 'center', borderRadius: '7.5px'}}
            >
              Invalid credentials
            </Typography> 
            : null
          }
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
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={credentialError}
                id="username"
                type="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={credentialError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'username' }}
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
                type='password'
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={credentialError ? 'error' : 'primary'}
                slotProps={{
                  input: {
                    endAdornment: 
                      <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' onClick={handlePasswordVisibility} style={{width: '25px', height: '20px'}}></img>
                  }
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={handleLogin}
              sx={{marginTop: '15px'}}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                  href="/signup"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMesssage} width='225px'/>
          </Box>
        </Card>
      </SignInContainer>
    </>
  )
};

export default LoginPage;