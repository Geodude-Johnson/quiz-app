import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

function LoginPage() {
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ invalid, setInvalid] = useState(false);

  const auth = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if(response.status === 200) {
        navigate('/home');
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.log("Error with Authentication:", error);
    }
  }

  const handleLogin = (e: React.MouseEvent<MouseEvent>) => {
    e.preventDefault();
    auth();
  };

  const handleNewAccount = (e: React.MouseEvent<MouseEvent>) => {
    e.preventDefault();
    navigate('/signup');
  };

  const [ user, setUser ] = useState<any>([]);
  const [ profile, setProfile ] = useState<any>([]);

  // to be confirmed
  interface GoogleResponse {
    access_token: string;
    email: string;
    name: string;
  }

  // TODO: change codeResponse to GoogleResponse type once object properties are confirmed
  const loginClick = useGoogleLogin({
      onSuccess: (codeResponse: any) => {
        console.log(codeResponse);
        setUser(codeResponse)
      },
      onError: (error: unknown) => console.log('Login Failed:', error)
  });

  const logoutClick = () => {
    googleLogout();
    console.log('Logged out');
  }

  useEffect(() => {
    if (user) {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
          .then(res => res.json())
          .then((res) => {
            setProfile(res);
          })
          .catch((err) => console.log(err));
    };
    console.log(user);
    console.log(profile);
  }, [user])


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

  
  return (
    <>
      {invalid ? 
        <>
          <h3>Invalid Credenntials. Please try again</h3>
        </> : null
      }
      <div>
        <label htmlFor='email'>Username: </label>
        <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email...'/>
      </div>
      <div>
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password...'/>
        <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' onClick={handlePasswordVisibility} style={{height: '20px', marginLeft: '-25px', marginBottom: '-5px'}}></img>
      </div>
      <div>
          <button aria-label="Sign in with Google" onClick={() => {loginClick}}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Sign in with Google</title>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-google-logo-blue"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-google-logo-green"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="fill-google-logo-yellow"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="fill-google-logo-red"
                ></path>
              </svg>
            </div>
            <span className="text-sm text-google-text-gray tracking-wider">Sign in with Google</span>
          </button>
        </div>
    </>
  )
};

export default LoginPage;