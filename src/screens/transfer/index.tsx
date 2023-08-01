import React, { FC, useState } from "react";
import { observer } from "mobx-react";
import styles from "./style.module.css";
import P2P from "../../../src/assets/svg/ServiceP2P.svg";
import iconVisa from "../../assets/img/icon-visa-196578.png";
import iconMc from "../../assets/svg/mc_symbol.svg";
import { Box, TextField } from "@mui/material";
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import { useParams } from "react-router-dom";
import { ComponentProps } from "../../types/ComponentProps";
import { Currency } from "../../types/CurrencyProp";
import { getThemeClass } from "../../utils/DarkLightStyle";
import { CardData } from "../../types/CardDataType";
import handleTransferStore from "../../stores/handleTransferStore";

interface TransferProps extends ComponentProps {
  currency: Currency;
  userId: string | undefined;
  userCards: CardData[];
}

const Transfer: FC<TransferProps> = observer((props) => {
  const { t, theme, currency, userId, userCards } = props;
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const { card } = useParams<{ card: string }>();
  const [destinationCardNumber, setDestinationCardNumber] = useState<string>(
    card || ""
  );
  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleTransferStore
      .handleTransfer(
        userCards,
        setMessage,
        selectedCard,
        t,
        amount,
        currency,
        destinationCardNumber,
        userId,
        setAmount,
        setDestinationCardNumber
      )
      .then((r) => r);
  };

  const wrapperTheme = `${styles.wrapper} ${
    theme === "dark" ? styles.wrapperDarkTheme : styles.wrapperLightTheme
  }`;
  return (
    <Box className={getThemeClass(theme, styles)}>
      <Box className={styles.trans}>
        <img src={P2P} alt="" />
        <Box className={styles.title}>
          <h1>{t("transfer.title")}</h1>
          <p>{t("transfer.description")}</p>
        </Box>
        <Box className={styles.icon}>
          <img src={iconVisa} alt="" />
          <img src={iconMc} alt="" />
        </Box>
      </Box>
      <Box className={wrapperTheme}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <CardSelect
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            userCards={userCards}
            title={t("transfer.cardDebit")}
          />
          <TextField
            className={styles.formGroup}
            label={t("transfer.destinationCard")}
            type="number"
            value={destinationCardNumber}
            onChange={(e) => setDestinationCardNumber(e.target.value)}
            required
          />
          <TextField
            className={styles.formGroup}
            label={t("transfer.amount")}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <ButtonPayment type={"submit"}>
            {t("transfer.transferButton")}
          </ButtonPayment>
          <p>{message}</p>
        </form>
      </Box>
    </Box>
  );
});

export default Transfer;
