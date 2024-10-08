import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import collectionLogo from "../../assets/collectionLogo.png";
import { useState, useEffect } from 'react';
/**collections styling  */

interface cardProps {
  question: string;
  answer: string;
  category: string; 
}

const IndividualCard = (props: cardProps) => {
  const { question, answer, category } = props;

  // const [showCard, setShowCard] = useState(true); // Track card visibility
  // const [showIndividualCollections, setShowIndividualCollections] = useState(false); // Track individual collections visibility
  
  const [showAnswer, setShowAnswer] = useState(false);
  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, minHeight: 200 }}>
        <CardActionArea onClick={handleClick} sx={{height: '100%'}}>
          <CardContent>
            <Typography gutterBottom component="div">
              {category}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {question}
            </Typography>
            {showAnswer ? 
              <Typography gutterBottom component="div" sx={{color: 'red'}}>
                {answer}
              </Typography> : null 
            }
            {/* <Typography variant="body2" sx={{ color: "primary.light" }}>
              User description of collection
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default IndividualCard;