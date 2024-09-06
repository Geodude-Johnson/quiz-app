/*
*change the review all endpoint to be querying and a specific endpoint for the user
*/
import React from 'react';
import {DndContext} from '@dnd-kit/core';
import Draggable from './dragAndDrop/draggableReview';
import Droppable from './dragAndDrop/droppableReview';
import {styled} from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import {CSS} from '@dnd-kit/utilities';

const StyledDecisionSection = styled('div')(({ theme }) => ({
    position: "relative",
    top: 70,
    left: 359,
    border: 'dashed white 7px',
    borderRadius: '50%',
    width: 'max-content',
    height: 'max-content',
    padding: 50,
    fontSize: 40,
}));

export const CollectionOptions = styled(Button)(({ theme }) => ({
    position: "relative",
    top: 120,
    left: 359,
    borderRadius: '25%',
    width: 'max-content',
    height: 'max-content',
    padding: 100,
    margin: 10,
    fontSize: 25,
}))
  
const DNDReview = () => {
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
    <StyledDecisionSection>
    <div>What collection would you like to review?</div>
    </StyledDecisionSection>
    <CollectionOptions onClick={handleReviewBack}>
    Back
    </CollectionOptions>
    <CollectionOptions onClick={handleReviewAll}>
    All
    </CollectionOptions>
    <CollectionOptions onClick={handleReviewSome}>
    Some (Coming Soon....)
    </CollectionOptions>
    
    {/* <DndContext>
      <Draggable />
      <Droppable />
    </DndContext> */}
    </>
  )
}
  export default DNDReview;