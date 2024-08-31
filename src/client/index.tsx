import {createRoot} from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
       palette: {
         mode: 'dark',
         primary: {
           main: '#008080', // Teal
           dark: '#006666',
           light: '#FFFFFF',
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
     <App />
   </ThemeProvider>
    
 
);