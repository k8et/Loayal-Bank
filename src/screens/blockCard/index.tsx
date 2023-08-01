import React, { FC, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Box, Button, Typography } from "@mui/material";
import styles from "./style.module.css";
import CardSelect from "../../components/cardSelect";
import cardBlock from "../../assets/svg/CardBlock.svg";
import { ComponentProps } from "../../types/ComponentProps";
import { CardData } from "../../types/CardDataType";

interface BlockCardProps extends ComponentProps {
  userCards: CardData[];
}

const BlockCardComponent: FC<BlockCardProps> = (props) => {
  const { t, theme, userCards } = props;
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string | null>(
    t("blockCard.blockButton")
  );

  const handleBlockCard = async () => {
    try {
      const cardDocRef = doc(db, "cards", selectedCardId);
      await updateDoc(cardDocRef, { isBlocked: !isBlocked });
      setMessage(
        `Card ${
          !isBlocked
            ? t("blockCard.successBlock")
            : t("blockCard.successUnblock")
        }`
      );
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error(
        "Error occurred while blocking/unblocking the card: ",
        error
      );
      setMessage(t("blockCard.error"));
    }
  };

  useEffect(() => {
    const selectedCard = userCards.find((card) => card.id === selectedCardId);
    if (!(selectedCard && selectedCard.data.isBlocked)) {
      setButtonText(t("blockCard.blockButton"));
    } else {
      setButtonText(t("blockCard.unblockButton"));
    }
  }, [selectedCardId, userCards]);

  return (
    <Box
      className={`${styles.main} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <Box className={styles.trans}>
        <img src={cardBlock} alt="" />
        <Box className={styles.title}>
          <h1>{t("blockCard.title")}</h1>
          <p>{t("blockCard.description")}</p>
        </Box>
      </Box>
      <Box
        className={`${styles.wrapper} ${
          theme === "dark" ? styles.wrapperDarkTheme : styles.wrapperLightTheme
        }`}
      >
        <Box className={styles.formGroup}>
          <CardSelect
            title={t("blockCard.selectCard")}
            selectedCard={selectedCardId}
            setSelectedCard={setSelectedCardId}
            userCards={userCards}
          />
        </Box>
        <Button
          className={styles.button}
          onClick={handleBlockCard}
          variant="contained"
        >
          {buttonText}
        </Button>
        {message && (
          <Typography className={styles.message}>{message}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default BlockCardComponent;
