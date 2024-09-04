import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";
import collectionLogo from "../../assets/collectionLogo.png";
import UserDataset from "./collectionData";

const StyledCollection = styled("div")(({ theme }) => ({
  position: "relative",
  top: 70,
  left: 359,
}));

function CardCollections() {
  const [showCollection, setShowCollection] = useState(false);
  const handleClick = () => {
    if (showCollection) {
      setShowCollection(false);
    } else {
      setShowCollection(true);
    }
  };
  return (
    <div>
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
              <Typography gutterBottom variant="h5" component="div">
                User collection 1 name
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                User description of collection
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </StyledCollection>
      {showCollection && (
        <div>
          <p>Collection data</p>
          <UserDataset />
        </div>
      )}
    </div>
  );
}

export default CardCollections;
