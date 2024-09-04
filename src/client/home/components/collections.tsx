import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import collectionLogo from '../../assets/collectionLogo.png';

const StyledCollection = styled('div')(({ theme }) => ({
    position: 'relative',
    top: 70,
    left: 359,
  }));

// const [showCollection, setShowCollection] = useState(false);

const handleClick = () => {
  // setShowCollection(true)
  console.log('clicked!')
}


function CardCollections () {
  return (
    // <div>
      <div >
    <StyledCollection>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={collectionLogo}
          alt="collection-logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            User collection 1 name
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.light' }}>
            User description of collection
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </StyledCollection>
    </div>
  );
}


export default CardCollections;