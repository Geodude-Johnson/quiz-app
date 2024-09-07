import * as React from "react";
import { useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atoms";

interface AddCollectionPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  setDbUpdate: Function;
}

const AddCollectionPopover: React.FC<AddCollectionPopoverProps> = ({
  open,
  anchorEl,
  handleClose,
  setStep,
  step,
  setDbUpdate,
}) => {
  // state to render the colleciton details
  const [collection, setCollection] = useState({
    collectionName: "",
    collectionDescription: "",
  });
  // state to hold current card details
  const [currCard, setCurrCard] = useState({
    question: "",
    answer: "",
    category: "",
  });
  // state to hold an array of card details
  interface Card {
    question: string;
    answer: string;
    category: string;
  }
  const [cards, setCards] = useState<Card[]>([]);
  // get user id
  const curUser = useAtomValue(userAtom);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    // probably should have a successful saved view
    if (step === 1) {
      setCollection({ ...collection });
    } else {
      saveCurrentCard();
      // use the useEffect hook to trigger saving to DB
      setIsSaving(true);
    }
  };

  useEffect(() => {
    if (isSaving) {
      saveToDB();
      setIsSaving(false);
    }
  }, [cards, isSaving]);

  const saveToDB = async () => {
    let collectionId: null | number = null;
    // add the collection and return the id
    try {
      const response = await fetch("/api/collections/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: curUser.id,
          name: collection.collectionName,
        }),
      });
      if (response.status === 200) {
        const collectionData = await response.json();
        collectionId = collectionData.id;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Error with adding new Collectiont to user:", error);
    }
    try {
      console.log(
        "what is the state of card collectin before saveing> ",
        cards
      );
      console.log("do i get the id still? ", collectionId);

      const response = await fetch(`/api/collections/card/${collectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards,
        }),
      });
    } catch (error) {
      console.log("Error with adding new card to collection:", error);
    }
    setDbUpdate(true);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleAddCard = () => {
    if (step === 1) {
      // save current collection id
      setCollection({ ...collection });
      setStep(2);
    } else {
      // in the case that its a card step, save those card details and reset the feilds
      saveCurrentCard();
    }
  };
  const saveCurrentCard = () => {
    setCards((prevCards) => [...prevCards, currCard]);
    setCurrCard((prevCard) => ({
      ...prevCard,
      question: "",
      answer: "",
      category: "",
    }));
  };
  const updateCardAnswer = () => {
    const cardAnswerInput = document.getElementById(
      "answer"
    ) as HTMLInputElement;

    const cardAnswer = cardAnswerInput.value;
    setCurrCard((prevCard) => ({
      ...prevCard,

      answer: cardAnswer,
    }));
  };
  const updateCardQuestion = () => {
    const cardQuesionInput = document.getElementById(
      "question"
    ) as HTMLInputElement;
    const cardQuestion = cardQuesionInput.value;
    setCurrCard((prevCard) => ({
      ...prevCard,
      question: cardQuestion,
    }));
  };
  const updateCardTopic = () => {
    const cardTopicInput = document.getElementById(
      "card-topic"
    ) as HTMLInputElement;
    const cardTopic = cardTopicInput.value;
    setCurrCard((prevCard) => ({
      ...prevCard,
      category: cardTopic,
    }));
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography sx={{ p: 2 }}>Collection</Typography>
            <FormControl>
              <TextField
                id="collection-name"
                label="New Collection Name"
                variant="outlined"
                value={collection.collectionName}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    collectionName: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                id="collection-description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={collection.collectionDescription}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    collectionDescription: e.target.value,
                  })
                }
                sx={{ mt: 2 }}
              />
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <Typography sx={{ p: 2 }}>Add A Card</Typography>
            <FormControl>
              <TextField
                id="card-topic"
                label="Card Topic"
                variant="outlined"
                fullWidth
                value={currCard.category}
                onChange={updateCardTopic}
              />
              <TextField
                id="question"
                label="Question"
                variant="outlined"
                fullWidth
                value={currCard.question}
                onChange={updateCardQuestion}
                sx={{ mt: 2 }}
              />
              <TextField
                id="answer"
                label="Answer"
                variant="outlined"
                fullWidth
                value={currCard.answer}
                onChange={updateCardAnswer}
                sx={{ mt: 2 }}
              />
            </FormControl>
          </>
        );
      // case 3:
      //   return (
      //     <>
      //       <Typography sx={{ p: 2 }}>Step 3: Final Review</Typography>
      //       <FormControl>
      //         <Typography>
      //           Review your details and confirm the submission.
      //         </Typography>
      //       </FormControl>
      //     </>
      //   );
      default:
        return <Typography>Invalid step</Typography>;
    }
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ padding: "16px", minWidth: "300px" }}>
        {renderFormStep()} {/* Render the current form step */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Render Back button if not on the first step */}
          {step === 1 && (
            <>
              {" "}
              <Button variant="contained" onClick={handleAddCard}>
                Add A Card
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </>
          )}

          {/* Render Next button or Submit based on the current step */}
          {step === 2 && (
            <>
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" onClick={handleAddCard}>
                Add A Card
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default AddCollectionPopover;
