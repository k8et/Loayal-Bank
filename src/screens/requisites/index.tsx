import React, { FC, useState } from "react";
import styles from "./style.module.css";
import { Box, TextField } from "@mui/material";
import CardSelect from "../../components/cardSelect";
import ServicePayment from "../../assets/svg/ServicePayments.svg";
import ButtonPayment from "../../components/buttonPayment";
import { useParams } from "react-router-dom";
import { ComponentProps } from "../../types/ComponentProps";
import { CardData } from "../../types/CardDataType";
import paymentStore from "../../stores/handlePaymentStore";

interface RequisitesProps extends ComponentProps {
  userId: string | undefined;
  userCards: CardData[];
}

const Requisites: FC<RequisitesProps> = (props) => {
  const { t, theme, userId, userCards } = props;
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { iBan } = useParams<{ iBan: string }>();
  const [message, setMessage] = useState<string>("");
  const [iban, setIban] = useState<string>(iBan || "");
  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paymentStore.handlePaymentSubmit(
        userCards,
        userId,
        selectedCard,
        t,
        amount,
        setMessage,
        iban
     ).then(r => r);
  };
  return (
    <Box
      className={`${styles.main} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <div className={styles.trans}>
        <img src={ServicePayment} alt="" />
        <div className={styles.title}>
          <h1>{t("requisites.payments")}</h1>
          <p>{t("requisites.noQueue")}</p>
        </div>
      </div>
      <Box
        className={`${styles.container} ${
          theme === "dark"
            ? styles.containerDarkTheme
            : styles.containerLightTheme
        }`}
      >
        <form
          className={styles.form}
          onSubmit={handlePayment}
        >
          <CardSelect
            title={t("requisites.sourceCard")}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            userCards={userCards}
          ></CardSelect>
          <TextField
            label={t("requisites.transferAmount")}
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="IBAN"
            type="text"
            id="reference"
            name="reference"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
          <ButtonPayment type="submit">{t("requisites.pay")}</ButtonPayment>
          {message}
        </form>
      </Box>
    </Box>
  );
};

export default Requisites;
