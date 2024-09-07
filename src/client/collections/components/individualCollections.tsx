//may need to pass state down from card collections to individual collections to get this to work properly
// /collections route shows the individual info and needs to dynamically render the user's collections
//try using react router instead of conditional rendering to get back to the collection page / endpoint
import React, { useState } from 'react';
import UserDataset from "./collectionData";
import CardCollections from "./cardCollections";
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { blue } from "@mui/material/colors";

const StyledCollection = styled("div")(({ theme }) => ({
    position: "relative",
    left: 20,
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  "&:hover": {
    backgroundColor: blue[600],
  },
  position: "relative", 
  top: 50, // Adjust top position
  left: 50, // Adjust left position
}));


const IndividualCollections = () => {
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
    navigate('/home');
  };

  const handleReviewClick = () => {
    navigate("/review");
  };

  return (
    <div>
        {showIndivCollection ? (<>
          <StyledCollection>
            <h3>Collection data</h3>
            <ColorButton variant="contained" onClick={handleReviewClick}>
              REVIEW QUESTIONS
            </ColorButton>
            <ColorButton variant="contained" onClick={goBack}>back</ColorButton>
          </StyledCollection>
          <UserDataset />
          </>
        ): <CardCollections />}
    </div>
  );
}

export default IndividualCollections;

// custom color button: https://mui.com/material-ui/react-button/
