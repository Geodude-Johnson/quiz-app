import * as React from 'react';
import IndividualCard from './individualCard';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { userAtom, collectionAtom } from "../../atoms";
import { useAtom } from "jotai";


interface MockData {
  id: number;
  question: string;
  answer: any;
  category: string;
}

// Pretend connection to DB (replace with actual DB query)
const mockData: MockData[] = [
  { id: 1, question: "True or False: a stack data structure is represented with a last in, first out approach", answer: true, category: "datastructures" },
  { id: 2, question: "Big O notation describes the relationship between the size of an input and what?", answer: "the computational steps it takes for the algorithm to complete", category: "algorithms" }
];

interface card {
  id: number;
  question: string;
  answer: string;
  category: string;    
}

const StyledCollection1 = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  position: 'relative',
  top: 70,
  left: 360,
  width: '50%',
  gap: '8px',
}));

// Render DB data
const UserDataset = () => {
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    getCards();
  }, [])

  // hard coded
  let collectionId = 88;

  // const [currUserAtom, setUserAtom] = useAtom(userAtom);
  // console.log(currUserAtom);
  
  const [currColleciontAtom, setCollectionAtom] = useAtom(collectionAtom);

  const getCards = async() => {
    try {
      const response = await fetch(`/api/collections/cards/${currColleciontAtom.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const temp : any = [];
        data.forEach((el: card) => {
          temp.push(<IndividualCard question={el.question} answer={el.answer} category={el.category} key={el.id}/>);
          console.log('collections: ', temp);
        })
        setAllCards(temp);
      }
    } catch (error) {
      console.log("Error with getting collections:", error);
    }
  }

  return (
    <div>
      <StyledCollection1>
        {allCards}
      </StyledCollection1>
    </div>
  );
};

export default UserDataset;