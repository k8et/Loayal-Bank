import React, { FC, useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Modal from "../../components/modalCard";
import styles from "./style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MessageModal from "../../components/messageModal";
import ActionCard from "./components/actionCard";
import { ComponentProps } from "../../types/ComponentProps";
import CardDetails from "./components/cardDetails";
import MyCard from "./components/myCard";
import {CardInfo} from "../../types/CardInfoType";
import {CardData} from "../../types/CardDataType";
import { Grid } from "@mui/material";
interface CardsProps extends ComponentProps{
  userCards: CardData[]
  userId: string | undefined
}
const Cards: FC<CardsProps> = (props) => {
  const { theme, t, userCards, userId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [lastUserName, setLastUserName] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  useEffect(() => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      let name: string = "";
      let lastName: string = "";
      querySnapshot.forEach((doc) => {
        name = doc.data().name;
        lastName = doc.data().lastName;
      });
      setUserName(name);
      setLastUserName(lastName);
    });
  }, [userId]);
  const handleButtonClick = () => {
    if (userCards.length >= 4) {
      setMessage(t('cards.alertCard'));
      setShowMessageModal(true);
      return;
    }
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setShowMessageModal(false);
  };

  const handleCardSelection = async (
    currency: string | undefined,
    cardType: string | undefined,
    cardColor: string
  ) => {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    const accountNumber = `0001${randomNumber}`.slice(-10);
    const cardNumber =
      (Math.floor(Math.random() * 5) + 51).toString() +
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join("");
    const cvv = Math.floor(100 + Math.random() * 900);

    const expirationDate = new Date();
    expirationDate.setMonth(11);
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);
    const month = expirationDate.getMonth() + 1;
    const year = expirationDate.getFullYear().toString().slice(-2);
    const expirationDateString = `${month < 10 ? "0" + month : month}/${year}`;

    const cardInfo: CardInfo = {
      userId: userId,
      currency: currency,
      cardType: cardType,
      cardColor: cardColor,
      cardNumber: cardNumber,
      accountNumber: accountNumber,
      cvv: cvv,
      expirationDate: expirationDateString,
      balance: 0,
    };

    try {
      const cardInfoRef = doc(collection(db, "cards"));
      await setDoc(cardInfoRef, cardInfo);
      console.log("Карта добавленна");
    } catch (error) {
      console.error("Ошибка добавления карты", error);
    }
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };
  const splitCardNum = (item: any) => {
    if (item && item.data && item.data.cardNumber) {
      return item.data.cardNumber.match(/.{1,4}/g).join(" ");
    }
  };
  return (
    <div
      className={`${styles.main} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
        <Grid className={styles.myCardCardDetailBox}>
          <MyCard
              settings={settings}
              userCards={userCards}
              splitCardNum={splitCardNum}
              handleButtonClick={handleButtonClick}
              t={t}
          />
          <CardDetails
              t={t}
              userCards={userCards}
              currentSlide={currentSlide}
              userName={userName}
              lastUserName={lastUserName}
          />
          <ActionCard t={t} />
        </Grid>
      {showModal && (
        <Modal
          onClose={handleModalClose}
          onCardSelection={handleCardSelection}
        />
      )}
      {showMessageModal && (
        <MessageModal onClose={handleModalClose} message={message} />
      )}
    </div>
  );
};
export default Cards;
