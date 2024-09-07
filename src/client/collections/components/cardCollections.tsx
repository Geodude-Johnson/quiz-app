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
import { Add } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import { useState, useEffect } from "react";
import Collections from "./collections";
import { userAtom, collectionAtom, CollectionType } from "../../atoms";
import { useAtom, useSetAtom } from "jotai";
import AddCollectionPopover from "./addCollectionPopover";

/**collections styling  */
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
  const [dbUpdate, setDbUpdate] = useState(false);

  const handleAddCard = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = () => {
    setShowCard(!showCard);
    // setShowIndividualCollections(!showIndividualCollections);
    setStep(1);
  };

  useEffect(() => {
    getCollections();
  }, [dbUpdate]);

  // get id from state
  let id = 88;

  interface collectionDB {
    id: number;
    created_at: string;
    userId: number;
    name: string;
  }

  const [allCollections, setAllCollections] = useState([]);
  const [currUserAtom, setUserAtom] = useAtom(userAtom);

  const getCollections = async () => {
    try {
      const response = await fetch(`/api/collections/${currUserAtom.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const temp: any = [];
        data.forEach((el: collectionDB) => {
          temp.push(
            <Collections
              name={el.name}
              key={el.id}
              collectionId={el.id}
              showCard={showCard}
              showIndividualCollections={showIndividualCollections}
              setShowCard={setShowCard}
              setShowIndividualCollections={setShowIndividualCollections}
            />
          );
          console.log("collections: ", temp);
        });
        setAllCollections(temp);
        setDbUpdate(false);
      }
    } catch (error) {
      console.log("Error with getting collections:", error);
    }
  };

  return (
    <div>
      {showCard && (
        <>
          <StyledFab color="secondary" aria-label="add" className="styled-fab">
            <AddCard onClick={handleAddCard} />
          </StyledFab>
          <StyledCollection1>
            {allCollections}
            {/* <Card sx={{ maxWidth: 345 }}>
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
                </CardContent>
              </CardActionArea>
            </Card> */}
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
        setDbUpdate={setDbUpdate}
      />
    </div>
  );
};

export default CardCollections;
