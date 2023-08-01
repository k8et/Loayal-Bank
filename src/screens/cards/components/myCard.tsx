import React, { FC } from "react";
import styles from "../style.module.css";
import Slider from "react-slick";
import mCard from "../../../assets/img/mastercard-logo-mastercard-logo-png-vector-download-19.png";
import vCard from "../../../assets/img/icon-visa-196578.png";
import { CardData } from "../../../types/CardDataType";
import { Box } from "@mui/material";

interface MyCardProps {
  settings: any;
  userCards: CardData[];
  splitCardNum: (item: any) => string;
  handleButtonClick: () => void;
  t: (key: string) => string;
}

const MyCard: FC<MyCardProps> = (props) => {
  const { settings, userCards, splitCardNum, handleButtonClick, t } = props;
  return (
    <Box className={styles.card}>
      <div className={styles.cardBackPos}>
        <Slider {...settings}>
          {userCards.length === 0 ? (
            <div className={styles.alertNoCard}>
              <p>У вас нет карт</p>
            </div>
          ) : (
            userCards.map((item, index) => (
              <div key={index}>
                <div
                  className={styles.cardBack}
                  style={{
                    backgroundColor:
                      item.data.cardColor === "Black" ? "black" : "white",
                    color: item.data.cardColor === "Black" ? "white" : "black",
                  }}
                >
                  <p className={styles.cardNumber}>{splitCardNum(item)}</p>
                  <p className={styles.expirationDate}>
                    {item.data.expirationDate}
                  </p>
                  <img
                    className={styles.cardLogo}
                    src={item.data.cardType === "Mastercard" ? mCard : vCard}
                    alt=""
                  />
                  <p>
                    {t("cards.balance")} {Math.floor(item.data.balance)}{" "}
                    {item.data.currency === "USD" ? "$" : "₴"}
                  </p>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
      <div className={styles.btnPos}>
        <button className={styles.btnCard} onClick={handleButtonClick}>
          {t("cards.createCard")}
        </button>
      </div>
    </Box>
  );
};

export default MyCard;
