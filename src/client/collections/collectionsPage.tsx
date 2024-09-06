//at some point i want to move this colorbutton to be an option when the left three horizontal tabs are clicked in the nav bar
//collections should also be an option within there ^^^
import * as React from "react";
import { useEffect } from "react";
import Footer from "../footer";
import SearchContainer from "./components/search";
import CardCollections from "./components/cardCollections";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { PrimitiveAtom, useAtom } from "jotai";

import { user, UserType } from "../atoms";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  "&:hover": {
    backgroundColor: blue[600],
  },
  position: "relative", // relative to the navBar
  top: 150, // Adjust top position
  left: 50, // Adjust left position
}));

function HomePage() {
  const [userData] = useAtom(user);
  const navigate = useNavigate();
  const handleReviewClick = () => {
    navigate("/review");
  };
  return (
    <>
      <ColorButton variant="contained" onClick={handleReviewClick}>
        REVIEW QUESTIONS {userData.username}
      </ColorButton>
      <SearchContainer />
      <CardCollections />
      <Footer />
    </>
  );
}

export default HomePage;

// custom color button: https://mui.com/material-ui/react-button/
