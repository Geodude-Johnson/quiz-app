/*skeleton for collections is set up, need to add dynamic rendering so that the collections will 
onyl appear if the collection exists 
*dynamically render the collection title and description 
based off user input

*addCard button not working

*showcards should map through database collections and show all that are applicable
*/
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
import { useState } from 'react';
/**collections styling  */
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
/**Add icon styling */
const StyledFab = styled(Fab)({
  position: 'relative',
  zIndex: 1,
  top: 3,
  left: 285,
  right: 0,
  margin: '0 auto',
});
/**Add a card functionality */
const handleAddCard = (e: any) => {
  e.preventDefault();
  return ('Clicked!');
}

/**Add a card button */
const AddCard = () => {
  return (
    <div>
      <AddIcon onClick={handleAddCard}/>
    </div>
  )
  }
  
const CardCollections = () => {
  const [showCard, setShowCard] = useState(true); // Track card visibility
  const [showIndividualCollections, setShowIndividualCollections] = useState(false); // Track individual collections visibility

  const handleClick = () => {
    setShowCard(!showCard);
    setShowIndividualCollections(!showIndividualCollections);
  };

  return (
    <div>
      {showCard && (
         <><StyledFab color="secondary" aria-label="add" className="styled-fab">
          <AddCard />
        </StyledFab><StyledCollection1>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={handleClick}>
                <CardMedia
                  component="img"
                  height="140"
                  image={collectionLogo}
                  alt="collection-logo" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    User collection 1 name
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
                  alt="collection-logo" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    User collection 2 name
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
                  alt="collection-logo" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    User collection 3 name
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </StyledCollection1></>
      )}
      {showIndividualCollections && <IndividualCollections />}
    </div>
  );
}

export default CardCollections;