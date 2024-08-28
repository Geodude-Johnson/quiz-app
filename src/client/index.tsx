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
         main: 'rgba(255, 82, 82, 1)',
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