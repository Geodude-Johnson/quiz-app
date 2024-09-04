import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';


const StyledCollection = styled('div')(({ theme }) => ({
    position: 'relative',
    top: 70,
    left: 359,
  }));

function CardCollections () {
  return (
    <StyledCollection>
      <button onClick={handleClick}> click <button/>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/client/assets/collectionLogo.png"
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
  );
}


export default CardCollections;


