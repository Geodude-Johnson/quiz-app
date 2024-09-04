import * as React from 'react';

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

// Render DB data
const UserDataset: React.FC = () => {
  return (
    <div>
      {mockData.map((data) => (
        <div key={data.id}>
          {data.question}
          <br />
          Answer: {data.answer.toString()}
          <br />
          Category: {data.category}
        </div>
      ))}
    </div>
  );
};

export default UserDataset;