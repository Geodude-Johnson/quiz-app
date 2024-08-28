import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
  
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  
const Footer: React.FC = () => {
return ( <React.Fragment>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer">
          <MenuIcon />  {/** three horizontal line logo 
           * should have the same functionality as the navbar
          */}
        </IconButton>
        <StyledFab color="secondary" aria-label="add">
          <AddIcon /> {/** + BUTTON  which should add cards*/}
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon /> 
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon /> {/**three horizontal dots */}
        </IconButton>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);
}

export default Footer; 