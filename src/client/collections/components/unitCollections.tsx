import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import collectionLogo from "../../assets/collectionLogo.png";
import IndividualCollections from "./individualCollections";
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import { useState, useEffect } from 'react';
/**collections styling  */

interface collection {
  name: string;
}

const unitCollections = (props: collection) => {
  const { name } = props;

  const [showCard, setShowCard] = useState(true); // Track card visibility
  const [showIndividualCollections, setShowIndividualCollections] = useState(false); // Track individual collections visibility

  const handleClick = () => {
    setShowCard(!showCard);
    setShowIndividualCollections(!showIndividualCollections);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="140"
            image={collectionLogo}
            alt="collection-logo" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            {/* <Typography variant="body2" sx={{ color: "primary.light" }}>
              User description of collection
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default unitCollections;