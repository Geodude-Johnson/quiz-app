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
      const response = await fetch(`http://localhost:8080/api/collections/cards/34`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.log('error fetching data:', error);
    }
  };

  return (
    <>
      <div>
        Review Div
        <section>
          {data.map((item, index) => (
            <div key={index}>
              <div>Question: {item.question}</div>
              <div>Answer: {item.answer}</div>
            </div>
          ))}
        </section>
        <CollectionOptions onClick={handleGoBack}>Back</CollectionOptions>
      </div>
    </>
  );
};

export default ReviewAll;