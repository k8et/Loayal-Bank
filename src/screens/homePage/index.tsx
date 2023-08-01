import React, {FC,useState} from "react";
import styles from "./style.module.css";
import {observer} from "mobx-react";
import {ComponentProps} from "../../types/ComponentProps";
import ContainerInput from "./components/containerInput";
import {Currency} from "../../types/CurrencyProp";
import {Box} from "@mui/material";
import {getThemeClass} from "../../utils/DarkLightStyle";

interface HomePageProp extends ComponentProps {
    currency: Currency

}

const HomePage: FC<HomePageProp> = observer((props) => {
    const {t, theme, currency} = props;
    const [currencyFrom, setCurrencyFrom] = useState<string>("USD");
    const [currencyTo, setCurrencyTo] = useState<string>("UAH");
    const [amount, setAmount] = useState<number | ''>('');
    const [convertedAmount, setConvertedAmount] = useState<number | "">("");
    const [phone, setPhone] = useState<string>("");
    const [card, setCard] = useState<string>("");
    const [iBan, setIBan] = useState<string>("");
    const currencies = ["USD", "EUR", "UAH", "GBP"];

    const handleConversion = () => {
        if (typeof amount === "number") {
            const rateFrom = currency[currencyFrom];
            const rateTo = currency[currencyTo];
            if (rateFrom && rateTo) {
                const conversionRate = rateTo / rateFrom;
                const convertedAmount = amount * conversionRate;
                setConvertedAmount(convertedAmount);
            }
        }
    };

    return (
        <Box
            className={getThemeClass(theme, styles)}
        >

            <ContainerInput
                card={card}
                setCard={setCard}
                phone={phone}
                setPhone={setPhone}
                iBan={iBan}
                setIBan={setIBan}
                currencyFrom={currencyFrom}
                setCurrencyFrom={setCurrencyFrom}
                currencyTo={currencyTo}
                setCurrencyTo={setCurrencyTo}
                amount={amount}
                setAmount={setAmount}
                currencies={currencies}
                t={t}
                convertedAmount={convertedAmount}
                handleConversion={handleConversion}
                theme={theme}
            />
        </Box>
    );
});

export default HomePage;
