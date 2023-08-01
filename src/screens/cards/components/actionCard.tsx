import React from "react";
import styles from "../style.module.css";
import { Link } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import ContactlessIcon from "@mui/icons-material/Contactless";
import ContactsIcon from "@mui/icons-material/Contacts";
import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import RequestPageIcon from "@mui/icons-material/RequestPage";

const ActionCard = (props: any) => {
  const { t } = props;
  return (
    <div className={styles.cardAction}>
      <h3>{t("cards.actions")}</h3>
      <div className={styles.action}>
        <Link to="/top-up">
          <div>
            <PaidIcon />
            <p>{t("cards.topUp")}</p>
          </div>
        </Link>
        <Link to="/transfer">
          <div>
            <ContactlessIcon />
            <p>{t("cards.transfer")}</p>
          </div>
        </Link>
        <Link to="/top-up-phone">
          <div>
            <ContactsIcon />
            <p>{t("cards.topUpPhone")}</p>
          </div>
        </Link>
        <Link to="/block-card">
          <div>
            <BlockIcon />
            <p>{t("cards.blockCard")}</p>
          </div>
        </Link>
        <Link to="/transaction-history">
          <div>
            <HistoryIcon />
            <p>{t("cards.transactionHistory")}</p>
          </div>
        </Link>
        <Link to="/requisites">
          <div>
            <RequestPageIcon />
            <p>{t("cards.requisites")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ActionCard;
