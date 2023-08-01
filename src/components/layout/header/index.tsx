import React, {FC, useContext, useEffect} from "react";
import styles from "./style.module.css";
import { ThemeContext } from "../../themeProvider";
import { Currency } from "../../../types/CurrencyProp";

interface HeaderProps {
  currency: Currency;
  t: (key:string) => string
}

const Header: FC<HeaderProps> = (props) => {
  const { currency, t } = props;
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  const { theme } = themeContext;

  const exchangeRate = currency.UAH;


  return (
    <div
      className={`${styles.main} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <div>{t("header.rate")}: 1 USD = {exchangeRate} UAH</div>
    </div>
  );
};

export default Header;
