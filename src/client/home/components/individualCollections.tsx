//may need to pass state down from card collections to individual collections to get this to work properly

//try using react router instead of conditional rendering to get back to the collection page / endpoint
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import collectionLogo from '../../assets/collectionLogo.png';
import UserDataset from "./collectionData";
import CardCollections from "./cardCollections";

const StyledCollection = styled("div")(({ theme }) => ({
    position: "relative",
    top: 70,
    left: 359,
}));

function IndividualCollections() {
  const [showCollection, setShowCollection] = useState(true);
  const handleClick = () => {
    if (showCollection) {
      setShowCollection(false);
    } else {
      setShowCollection(true);
    }
  };

  const goBack = () => {
    setShowCollection(false); // Set showCollection to false to hide individual collections
  };

  return (
    <div>
        {showCollection ? (
          <div>
            <p>Collection data</p>
            <UserDataset />
            <button onClick={goBack}>back</button>
          </div>
        ) : (<p>test</p>
        )}
    </div>
  );
}

export default IndividualCollections;