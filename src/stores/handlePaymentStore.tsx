import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import React, { Dispatch, SetStateAction } from "react";
import { CardData } from "../types/CardDataType";
import { action, makeObservable } from "mobx";

class PaymentStore {
  constructor() {
    makeObservable(this, { handlePaymentSubmit: action });
  }

  handlePaymentSubmit = async (
    userCards: CardData[],
    userId: string | undefined,
    selectedCard: string,
    t: (key: string) => string,
    amount: string,
    setMessage: Dispatch<SetStateAction<string>>,
    iban: string
  ) => {
    try {
      const sourceCard: any = this.findSourceCard(userCards, selectedCard);

      if (sourceCard.isBlocked) {
        return setMessage(t("requisites.cardIsBlocked"));
      }

      if (!sourceCard) {
        return setMessage(t("requisites.selectSourceCard"));
      }

      const amountToTransfer = parseFloat(amount);

      if (isNaN(amountToTransfer)) {
        return setMessage(t("requisites.enterValidAmount"));
      }

      if (sourceCard.balance < amountToTransfer) {
        return setMessage(t("requisites.insufficientBalance"));
      }

      const recipientCard = await this.findRecipientCard(iban);

      if (!recipientCard) {
        return setMessage(t("requisites.recipientCardNotFound"));
      }

      await this.updateSourceCardBalance(
        sourceCard.id,
        sourceCard.balance - amountToTransfer
      );
      await this.updateRecipientCardBalance(
        recipientCard.ref,
        recipientCard.balance + amountToTransfer
      );
      await this.addTransaction(
        userId,
        selectedCard,
        sourceCard.data.cardNumber,
        amountToTransfer,
        iban,
        t
      );

      setMessage(t("requisites.paymentSuccess"));
    } catch (error) {
      setMessage(t("requisites.paymentError"));
      console.error(error);
    }
  };

  findSourceCard = (userCards: CardData[], selectedCard: string) => {
    return userCards.find((card) => card.id === selectedCard);
  };

  findRecipientCard = async (iban: string) => {
    const q = query(
      collection(db, "cards"),
      where("accountNumber", "==", iban)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  };

  updateSourceCardBalance = async (cardId: string, newBalance: number) => {
    await updateDoc(doc(db, "cards", cardId), { balance: newBalance });
  };

  updateRecipientCardBalance = async (
    recipientCardRef: any,
    newBalance: number
  ) => {
    await updateDoc(recipientCardRef, { balance: newBalance });
  };

  addTransaction = async (
    userId: string | undefined,
    cardId: string,
    cardNumber: string,
    amount: number,
    iban: string,
    t: (key: string) => string
  ) => {
    const transactionsCollection = collection(db, "transactions");
    const transactionData = {
      userId,
      cardId,
      cardNumber,
      amount,
      date: new Date(),
      type: t("requisites.transferType"),
      iban,
    };
    await addDoc(transactionsCollection, transactionData);
  };
}

const paymentStore = new PaymentStore();
export default paymentStore;
