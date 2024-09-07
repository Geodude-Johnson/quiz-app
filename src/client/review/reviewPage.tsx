/*!
hello
*change the review all endpoint to be querying and a specific endpoint for the user
*/
import React from 'react';
import {styled} from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar';
// import {CSS} from '@dnd-kit/utilities';

const StyledDecisionSection = styled('div')(({ theme }) => ({
    position: "relative",
    top: 70,
    left: 159,
    border: 'dashed white 7px',
    borderRadius: '50%',
    width: 'max-content',
    height: 'max-content',
    padding: 50,
    fontSize: 40,
    backgroundColor: '#008080',
}));

export const CollectionOptions = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#ff4081'),
  "&:hover": {
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
    position: "relative",
    top: 220,
    left: 159,
    borderRadius: '25%',
    width: 'max-content',
    height: 'max-content',
    padding: 60,
    margin: 10,
    fontSize: 25,
    backgroundColor: '#ff4081',
}))

const Review = () => {
    const navigate = useNavigate();
    const handleReviewBack = () => {
      navigate('/');
    }
    const handleReviewAll = () => {
        navigate('/reviewAll')
    }
    const handleReviewSome = () => {
      console.log('/goToReviewSome')
    }
  return (
    <>
    <NavBar></NavBar>
    <StyledDecisionSection>
    <div>What collection would you like to review?</div>
    </StyledDecisionSection>
    <CollectionOptions onClick={handleReviewBack}>
    Go Back
    </CollectionOptions>
    <CollectionOptions onClick={handleReviewAll}>
    All Questions
    </CollectionOptions>
    <CollectionOptions onClick={handleReviewSome}>
    (Coming Soon....)
    </CollectionOptions>
    </>
  )
}
  export default Review;