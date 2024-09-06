import React from 'react';
import {DndContext} from '@dnd-kit/core';
import Draggable from './dragAndDrop/draggableReview';
import Droppable from './dragAndDrop/droppableReview';
import {styled} from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {CollectionOptions} from './reviewPage';

const ReviewAll: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
    navigate('/review')
    };
    return (
        <>
          <div>
          Review Div
          <section><div>question1</div><div>answer1</div></section></div>
          <CollectionOptions onClick={handleGoBack}>
            Back
          </CollectionOptions>

        </>
    )
}

export default ReviewAll;