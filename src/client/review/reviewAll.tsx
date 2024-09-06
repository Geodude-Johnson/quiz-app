//query for cards within selected collection
import React, { useEffect, useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import Draggable from './dragAndDrop/draggableReview';
import Droppable from './dragAndDrop/droppableReview';
import {styled} from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {CollectionOptions} from './reviewPage';
interface Card {
  question: string;
  answer: string;
  created_at: string;
  category: string;
  collection_name: string | null;
  id: number;
  collection_id: number;
}
const ReviewWelcome = styled('div')(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  top: 40,
  left: 40,
  width: '50%',
  gap: '8px',
  backgroundColor: '#008080',
  textAlign: 'center',
}));

const QuestionStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#006666',
  width: '50%',
  position: 'relative',
  padding: 5,
  margin: 10,
  top: 65,
  // gridColumnStart: 1,
  // gridColumnEnd: 2, // Adjust as needed
}));

const AnswerStyle = styled('div')(({ theme }) => ({
backgroundColor: '#FFFFFF',
position: 'relative',
color: '#006666',
width: '50%',
padding: 5,
margin: 10,
top: 65,
// gridColumnStart: 2,
// gridColumnEnd: 3, // Adjust as needed
}));

const DirectionsStyle = styled('div')(( { theme }) => ({
  position: 'relative',
  top: 45,
  left: 40,
  padding: 10,
  backgroundColor: '#008080',
  width: 'max-content',

}))

const ReviewAll: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/review');
  };

  const [data, setData] = useState<Card[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/collections/cards/88`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const fetchedData = await response.json();
      setData(fetchedData);

      if (fetchedData.length > 0) {
        console.log('questions', fetchedData[0].question);
        console.log('fetchedData', fetchedData);
      } else {
        console.log('No cards found in fetched data');
      }
    } catch (error) {
      console.log('error fetching data:', error);
    }
  };

  return (
    <>
  {  /** heading  */}
      <ReviewWelcome color="secondary">
        GOOD LUCK !  
      </ReviewWelcome>

    {  /** directions  */}
      <DirectionsStyle><h3> Directions </h3>
      <ul>
        <li> Questions are displayed on the left</li>
        <li> Answers are displayed on the right</li>
      </ul>
      </DirectionsStyle>

     { /* *questions/answers*/}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '5px' }}>
        {data.map((item, index) => (
          <div key={index}>
            {    /**questions */}
            <QuestionStyle>
            <div>{item.question}</div>
            </QuestionStyle>
           { /**answers */}
            <AnswerStyle>
            <div>{item.answer}</div>
            </AnswerStyle>
          </div>
        ))}
      </div>

      <CollectionOptions onClick={handleGoBack}>Back</CollectionOptions>
    
     </>
  )
};

export default ReviewAll;
