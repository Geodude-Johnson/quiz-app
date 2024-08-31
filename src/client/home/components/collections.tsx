/*skeleton for collections is set up, need to add dynamic rendering so that the collections will 
onyl appear if the collection exists 
*dynamically render the collection title and description 
based off user input

*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import collectionLogo from '../../assets/collectionLogo.png';

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

function CardCollections() {
  return (
    <div>
      <StyledCollection1>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={collectionLogo}
              alt="collection-logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User collection 1 name
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                User description of collection
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
   
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={collectionLogo}
              alt="collection-logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User collection 2 name
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                User description of collection
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={collectionLogo}
              alt="collection-logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User collection 2 name
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                User description of collection
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </StyledCollection1>
    </div>
  );
}

export default CardCollections;