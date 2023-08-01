import React, { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./style.module.css";
import {CardData} from "../../types/CardDataType";
import {observer} from "mobx-react";


interface CardSelectProps {
    title: string;
    selectedCard: string;
    setSelectedCard: (value: string) => void;
    userCards: CardData[];
}
const CardSelect: FC<CardSelectProps> = ({
  selectedCard,
  setSelectedCard,
  userCards,
  title,
}) => {
  return (
    <FormControl variant="filled" className={styles.formGroup}>
      <InputLabel id="sourceCard">{title}</InputLabel>
      <Select
        labelId="sourceCard"
        value={selectedCard}
        onChange={(e) => setSelectedCard(e.target.value)}
      >
        {userCards.map((card) => (
          <MenuItem key={card.id} value={card.id}>
            {card.data.cardNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CardSelect;
