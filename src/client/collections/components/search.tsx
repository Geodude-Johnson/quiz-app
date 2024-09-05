/*
* need to add dymanic functionality so we can search through the collections, function skeleton
set up to console log 'searched' 
this is working when the mouse leaves the block , not any other times */
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import useMediaQuery from '@mui/material/useMediaQuery';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  top: 30,
  left: 359,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const handleSearch = () => {
  console.log('searched!')
}

const SearchContainer = () => {
return  (
<div>
  <Search className="search-container">
<SearchIconWrapper>
  <SearchIcon />
  
</SearchIconWrapper>
<StyledInputBase
  placeholder=" Search and press enter..."
  inputProps={{ 'aria-label': 'search' }}
  onMouseLeave={handleSearch}
/>
</Search>
</div>
)}

export default SearchContainer;
