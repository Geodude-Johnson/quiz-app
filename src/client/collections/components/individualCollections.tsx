//may need to pass state down from card collections to individual collections to get this to work properly
// /collections route shows the individual info and needs to dynamically render the user's collections
//try using react router instead of conditional rendering to get back to the collection page / endpoint
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import UserDataset from "./collectionData";
import CardCollections from "./cardCollections";
import { useNavigate } from 'react-router-dom';

const StyledCollection = styled("div")(({ theme }) => ({
    position: "relative",
    top: 70,
    left: 359,
}));

function IndividualCollections() {
  const [showIndivCollection, setShowCollection] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    if (showIndivCollection) {
      setShowCollection(false);
      navigate('/collections')
    } else {
      setShowCollection(true);
    }
  };

  const goBack = () => {
    setShowCollection(false); // Set showCollection to false to hide individual collections
    navigate('/');
  };


  return (
    <div>
        {showIndivCollection ? (<>
          <StyledCollection>
            <p>Collection data</p>
            <button onClick={goBack}>back</button>
          </StyledCollection>
          <UserDataset />
          </>
        ): <CardCollections />}
    </div>
  );
}

export default IndividualCollections;