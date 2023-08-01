import {action, makeObservable} from "mobx";
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
import { CardData } from "../types/CardDataType";
import { Dispatch, SetStateAction } from "react";
import {Currency} from "../types/CurrencyProp";

class HandleTransferStore {
  constructor() {
    makeObservable(this, {handleTransfer: action});
  }

  handleTransfer = async(
    userCards: CardData[],
    setMessage: Dispatch<SetStateAction<string | null>>,
    selectedCard:string,
    t:((key:string) => string),
    amount: string,
    currency: Currency,
    destinationCardNumber: string,
    userId: string | undefined,
    setAmount:Dispatch<SetStateAction<string>>,
    setDestinationCardNumber:Dispatch<SetStateAction<string>>,

  ) => {
    const sourceCard: any = userCards.find(
      (card: any) => card.id === selectedCard
    );
    if (sourceCard?.data.isBlocked) {
      setMessage(t("requisites.cardIsBlocked"));
      return;
    }

    if (!sourceCard || !destinationCardNumber) {
      setMessage(t("transfer.sourceCardNotFound"));
      return;
    }

    const destinationCardRef = collection(db, "cards");
    const destinationCardQuery = query(
      destinationCardRef,
      where("cardNumber", "==", destinationCardNumber)
    );

    const destinationCardSnapshot = await getDocs(destinationCardQuery);

    if (destinationCardSnapshot.empty) {
      setMessage(t("transfer.destinationCardNotFound"));
      return;
    }

    const destinationCardDoc = destinationCardSnapshot.docs[0];
    const destinationCardData = destinationCardDoc.data();

    let amountToTransfer = parseFloat(amount);
    let updatedDestinationBalance = destinationCardData.balance;

    if (
        sourceCard.data.currency === "USD" &&
        destinationCardData.currency === "UAH"
    ) {
      amountToTransfer *= currency.UAH;
      updatedDestinationBalance += amountToTransfer;
      sourceCard.data.balance -= amountToTransfer / currency.UAH;
    } else if (
        sourceCard.data.currency === "UAH" &&
        destinationCardData.currency === "USD"
    ) {
      amountToTransfer /= currency.UAH;
      updatedDestinationBalance += amountToTransfer;
      sourceCard.data.balance -= amountToTransfer * currency.UAH;
    }
    else if (
        sourceCard.data.currency === "USD" &&
        destinationCardData.currency === "USD"
    ) {
      updatedDestinationBalance += amountToTransfer;
      sourceCard.data.balance -= amountToTransfer;
    } else if (
        sourceCard.data.currency === "UAH" &&
        destinationCardData.currency === "UAH"
    ) {
      updatedDestinationBalance += amountToTransfer;
      sourceCard.data.balance -= amountToTransfer;
    }

    await updateDoc(doc(db, "cards", sourceCard.id), {
      balance: sourceCard.data.balance,
    });

    await updateDoc(doc(db, "cards", destinationCardDoc.id), {
      balance: updatedDestinationBalance,
    });

    const transactionsCollection = collection(db, "transactions");
    const transactionData = {
      userId,
      cardId: selectedCard,
      cardNumber: sourceCard.data.cardNumber,
      amount: amountToTransfer,
      date: new Date(),
      type: t("transfer.transferType"),
      onCard: destinationCardNumber,
    };
    await addDoc(transactionsCollection, transactionData);

    console.log(t("transfer.transferSuccess"));

    setAmount("");
    setDestinationCardNumber("");
    setMessage("");
  }
}
const handleTransferStore = new HandleTransferStore()
export default handleTransferStore