import * as React from 'react';
import { useEffect } from 'react';
import Footer from '../footer';
import SearchContainer from './components/search';
import CardCollections from './components/collections';
 import { styled } from '@mui/material/styles';
 import Button, { ButtonProps } from '@mui/material/Button';
 import Stack from '@mui/material/Stack';
 import { blue } from '@mui/material/colors';




const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[400],
  '&:hover': {
    backgroundColor: blue[600],
  },
  position: 'relative', // relative to the navBar
  top: 150, // Adjust top position
  left: 50, // Adjust left position
}));





function HomePage () {
  return (<>
  {/* <ColorButton variant="contained">MUI TEST BUTTON</ColorButton> */}
  <SearchContainer />
  <CardCollections />
  <Footer />
  </>);
}

export default HomePage;


// custom color button: https://mui.com/material-ui/react-button/
