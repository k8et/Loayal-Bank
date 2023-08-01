import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.css";
import { observer } from "mobx-react";
import { Box, TextField, Typography } from "@mui/material";
import Top from "../../assets/svg/ServiceBonds.svg";
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import { ComponentProps } from "../../types/ComponentProps";
import { Currency } from "../../types/CurrencyProp";
import { getThemeClass } from "../../utils/DarkLightStyle";
import { CardData } from "../../types/CardDataType";
import topUpStore from "../../stores/handleTopUpStore";

interface TopUpProps extends ComponentProps {
  currency: Currency;
  userId: string | undefined;
  userCards: CardData[];
}

const TopUp: FC<TopUpProps> = observer((props) => {
  const { theme, t, currency, userId, userCards } = props;
  const [amount, setAmount] = useState<string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<CardData | undefined>();
  const [isCardBlocked, setCardBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (userId && userCards && selectedCardId) {
      const card = userCards.find((card) => card.id === selectedCardId);
      setSelectedCard(card);
      if (card) {
        setCardBlocked(card.data.isBlocked);
        if (card.data.currency === "USD") {
          setCurrencySymbol("USD");
        } else {
          setCurrencySymbol("UAH");
        }
      }
    }
  }, [userCards, userId, selectedCardId]);

  useEffect(() => {
    if (userId && userCards) {
      setSelectedCardId(userCards[0]?.id!);
    }
  }, [userCards]);
  const topUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    topUpStore
      .handleTopUpBalance(
        t,
        currency,
        userCards,
        userId,
        selectedCard,
        selectedCardId,
        isCardBlocked,
        setMessage,
        amount
      )
      .then((r) => r);
  };
  const wrapperTheme = `${styles.wrapper} ${
    theme === "dark" ? styles.wrapperDarkTheme : styles.wrapperLightTheme
  }`;
  return (
    <Box className={getThemeClass(theme, styles)}>
      <Box className={styles.trans}>
        <img src={Top} alt="" />
        <Box className={styles.title}>
          <h1>{t("topUp.pageTitle")}</h1>
        </Box>
      </Box>
      <Box className={wrapperTheme}>
        <form className={styles.form} onSubmit={topUp}>
          <Box className={styles.formGroup}>
            <CardSelect
              title={t("topUp.cardTopUp")}
              selectedCard={selectedCardId}
              setSelectedCard={setSelectedCardId}
              userCards={userCards}
            />
          </Box>
          <Box className={styles.formGroup}>
            <TextField
              type="number"
              value={amount !== undefined ? amount : ""}
              label={t("topUp.amountLabel")}
              placeholder={currencySymbol}
              onChange={(e) => setAmount(e.target.value)}
              required
              className={styles.input}
            />
          </Box>
          <ButtonPayment type={"submit"}>
            {t("topUp.topUpButton")}
          </ButtonPayment>
          <Typography>{message}</Typography>
        </form>
      </Box>
    </Box>
  );
});

export default TopUp;
