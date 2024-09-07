import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import collectionLogo from "../../assets/collectionLogo.png";
import IndividualCollections from "./individualCollections";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import AddCollectionPopover from "./addCollectionPopover"; // Import the popover component

const StyledCollection1 = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr",
  position: "relative",
  top: 70,
  left: 360,
  width: "50%",
  gap: "8px",
}));

const StyledFab = styled(Fab)({
  position: "relative",
  zIndex: 1,
  top: 3,
  left: 285,
  right: 0,
  margin: "0 auto",
});

const AddCard = ({ onClick }: { onClick: (e: any) => void }) => {
  return (
    <div>
      <AddIcon onClick={onClick} />
    </div>
  );
};

const CardCollections = () => {
  const [showCard, setShowCard] = useState(true);
  const [showIndividualCollections, setShowIndividualCollections] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [step, setStep] = useState(1);

  const handleAddCard = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = () => {
    setShowCard(!showCard);
    setShowIndividualCollections(!showIndividualCollections);
    setStep(1);
  };

  return (
    <div>
      {showCard && (
        <>
          <StyledFab color="secondary" aria-label="add" className="styled-fab">
            <AddCard onClick={handleAddCard} />
          </StyledFab>
          <StyledCollection1>
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
                  <Typography variant="body2" sx={{ color: "primary.light" }}>
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
                    User collection 3 name
                  </Typography>
                  <Typography variant="body2" sx={{ color: "primary.light" }}>
                    User description of collection
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </StyledCollection1>
        </>
      )}
      {showIndividualCollections && <IndividualCollections />}

      {/* Render the AddCollectionPopover and pass the required props */}
      <AddCollectionPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClosePopover}
        setStep={setStep}
        step={step}
      />
    </div>
  );
};

export default CardCollections;
