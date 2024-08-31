import {createRoot} from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';


const darkTheme = createTheme({
       palette: {
         mode: 'dark',
         primary: {
           main: '#008080', // Teal
           dark: '#006666',
           light: '#66B2B2',
         },
         secondary: {
           main: '#ff4081', // Pink
         },
         background: {
           default: '#303030',
         },
         text: {
           primary: '#ffffff',
           secondary: '#909090',
         },
       },
       typography: {
         fontFamily: 'Roboto',
         fontSize: 14,
         fontWeightLight: 300,
         fontWeightRegular: 400,
         fontWeightBold: 700,
       },
       spacing: 2, // Default spacing value
       breakpoints: {
         values: {
           xs: 0,
           sm: 600,
           md: 900,
           lg: 1200,
           xl: 1536,
         },
       },
     });
const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <GoogleOAuthProvider clientId='1007803784486-5flseicun88phk3lqoffrgmn3svj34ah.apps.googleusercontent.com'>
     <App />
    </GoogleOAuthProvider>
  </ThemeProvider>
    
 
);