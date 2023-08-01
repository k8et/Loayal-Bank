import { Dispatch, SetStateAction } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { CardData } from "../types/CardDataType";
import {action, makeObservable} from "mobx";

class TopUpPhone {
  constructor() {
    makeObservable(this,{handleTopUp: action})
  }
  handleTopUp = async (
    userCards: CardData[],
    selectedCardId: string,
    amount: string,
    userId: string | undefined,
    phoneNumber: string,
    t: (key: string) => string,
    setMessage: Dispatch<SetStateAction<string>>
  ) => {
    const selectedCard: any = userCards.find(
      (card) => card.id === selectedCardId
    );
    if (selectedCard?.data.isBlocked) {
      setMessage(t("requisites.cardIsBlocked"));
      return;
    }
    const amountToNum = parseFloat(amount);
    if (selectedCard) {
      const updatedBalance = selectedCard.data.balance - amountToNum;

      if (updatedBalance >= 0) {
        const cardRef = doc(db, "cards", selectedCard.id);
        await updateDoc(cardRef, { balance: updatedBalance });

        await this.UpdateTransactionData(
          userId,
          selectedCard,
          phoneNumber,
          amountToNum,
          t
        );

        setMessage(t("topUpPhonePage.balanceUpdated"));
      } else {
        setMessage(t("topUpPhonePage.insufficientBalance"));
      }
    } else {
      setMessage(t("topUpPhonePage.noCardsFound"));
    }
    setMessage("");
  };
  UpdateTransactionData = async (
    userId: string | undefined,
    selectedCard: CardData,
    phoneNumber: string,
    amountToNum: number,
    t: (key: string) => string
  ) => {
    const transactionData = {
      userId: userId,
      cardId: selectedCard.id,
      cardNumber: selectedCard.data.cardNumber,
      phoneNumber: phoneNumber,
      amount: amountToNum,
      date: new Date(),
      type: t("topUpPhonePage.title"),
    };

    await addDoc(collection(db, "transactions"), transactionData);
  };
}

const topUpPhone = new TopUpPhone();
export default topUpPhone;
