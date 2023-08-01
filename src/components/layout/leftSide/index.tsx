import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styles from "./style.module.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../../themeSwitcher";
import { ThemeContext } from "../../themeProvider";
import BurgerMenu from "../../burgerMenu";
import Switch from "@mui/material/Switch";
import SwitcherLanguage from "../../switcherLanguage";

const LeftSide = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  const { theme } = themeContext;
  return (
    <div>
      {windowWidth <= 1100 ? (
        <BurgerMenu t={t} theme={theme} />
      ) : (
        <div
          className={`${styles.main} ${
            theme === "dark" ? styles.darkTheme : styles.lightTheme
          }`}
        >
          <div className={styles.iconLogoPos}>
            <WidgetsIcon sx={{ width: "28px" }} />
            <h3>LoyalBank</h3>
          </div>
          <div className={styles.nav}>
            <div className={styles.navContainer}>
              <div className={styles.navItem}>
                <WidgetsIcon />
                <Link to="/home">{t("leftSide.myBank")}</Link>
              </div>
              <div className={styles.navItem}>
                <CreditCardIcon />
                <Link to="/cards">{t("leftSide.myCard")}</Link>
              </div>
              <div className={styles.navItem}>
                <PaymentsIcon />
                <Link to="/requisites">{t("leftSide.payment")}</Link>
              </div>
              <div className={styles.navItem}>
                <HistoryIcon />
                <Link to="/transaction-history">{t("leftSide.history")}</Link>
              </div>
              <div className={styles.navItem}>
                <PersonIcon />
                <Link to="/profile">{t("leftSide.myProfile")}</Link>
              </div>
            </div>
            <div className={styles.lngTheme}>
              <SwitcherLanguage />
              <ThemeSwitcher className={styles.themeSwitcher} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
