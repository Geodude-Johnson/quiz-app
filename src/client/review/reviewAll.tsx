/**
 * to do: randomize the questions that appear
 * change the review button to be within the specific collection
 */

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
import NavBar from "../navBar";
interface Card {
  question: string;
  answer: string;
  created_at: string;
  category: string;
  collection_name: string | null;
  id: number;
  collection_id: number;
}

const ReviewWelcome = styled("div")(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  top: 40,
  left: 40,
  width: "50%",
  gap: "8px",
  backgroundColor: "#008080",
  textAlign: "center",
}));

const QuestionStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center", // Center items horizontally
  alignItems: "center", // Center items vertically
  backgroundColor: "#FFFFFF",
  color: "#006666",
  width: "50%",
  left: 40,
  position: "relative",
  padding: 5,
  top: 65,
  height: 200,
}));

const AnswerStyle = styled("div")(({ theme }) => ({
  // display: 'flex',
  justifyContent: "center", // Center items horizontally
  alignItems: "center", // Center items vertically
  backgroundColor: "#FFFFFF",
  color: "#006666",
  width: "50%",
  left: 40,
  position: "relative",
  padding: 5,
  top: 65,
  height: 200,
  display: "none", // Initially hide the answer
}));

const DirectionsStyle = styled("div")(({ theme }) => ({
  position: "relative",
  top: 45,
  left: 40,
  padding: 7,
  backgroundColor: "#008080",
  width: "50%",
}));

const NextStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#ff4081'),
  "&:hover": {
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
  backgroundColor: "#ff4081",
  width: "max-content",
  padding: 60,
  borderRadius: "25%",
  margin: 20, 
  left: 550,   
  top: 75,
  position: "relative"
}));

const ReviewAll: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/review");
  };

  const [data, setData] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/collections/cards/88`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const reviewData = await response.json();
      if (reviewData.length > 0) {
        setData(reviewData);
      } else {
        console.log("No cards found in fetched data");
      }
    } catch (error) {
      console.log("error fetching data:", error);
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
    setShowAnswer(false); // Reset showAnswer for the next card
  };

  return (
    <>
    <NavBar></NavBar>
      <ReviewWelcome color="secondary">GOOD LUCK !</ReviewWelcome>
      <DirectionsStyle>
        <h3> Directions </h3>
        <ul>
          <li> {" Questions are displayed one at a time"}</li>
          <li> {"Click the question card to display the answer"}</li>
          <li> {"Click the next button to display the next question"}</li>
          <li>
            {" "}
            {"Ready for a break? Hit Back to go back to your collection"}
          </li>
        </ul>
      </DirectionsStyle>
      <div>
        {data.length > 0 && (
          <div>
            <QuestionStyle onClick={() => setShowAnswer(!showAnswer)}>
              <div>{data[currentCardIndex].question}</div>
            </QuestionStyle>
            <AnswerStyle style={{ display: showAnswer ? "block" : "none" }}>
              <div>
                <em>Answer:</em> {data[currentCardIndex].answer}
              </div>
            </AnswerStyle>
          </div>
        )}
        <NextStyle onClick={handleNextCard}>
          <h3>Next Question</h3>
        </NextStyle>
      </div>
      <NextStyle onClick={handleGoBack} style={{left: 0,top: 50, width: '50%', backgroundColor: '#008080'}}>Exit Review</NextStyle>
    </>
  );
};

export default ReviewAll;
