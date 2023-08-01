import React, {FC} from "react";
import styles from "../style.module.css";
import P2P from "../../../assets/svg/ServiceP2P.svg";
import {Box, InputAdornment, MenuItem, Select, TextField,} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {Link} from "react-router-dom";
import Phone from "../../../assets/svg/ServiceMobile.svg";
import IBAN from "../../../assets/svg/ServicePayments.svg";
import Currency from "../../../assets/svg/ServiceCurrency.svg";
import HeightIcon from "@mui/icons-material/Height";
import ButtonWithArrow from "../../../components/buttonWithArrow";
import {ContainerInputProps} from "../../../types/ContainerInputProps";
import IconButton from "@mui/material/IconButton";

const ContainerInput: FC<ContainerInputProps> = (props) => {
    const {
        card,
        setCard,
        phone,
        setPhone,
        iBan,
        setIBan,
        currencyFrom,
        setCurrencyFrom,
        currencyTo,
        setCurrencyTo,
        amount,
        setAmount,
        currencies,
        t,
        convertedAmount,
        handleConversion,
        theme,
    } = props;
    return (
        <Box className={styles.container}>
            <Box
                className={`${styles.box} ${
                    theme === "light" ? styles.boxLight : styles.boxDark
                }`}
            >
                <Box className={styles.titleBox}>
                    <img src={P2P} alt=""/>
                    <h3>{t("homepage.transferToCard")}</h3>
                </Box>
                <Box className={styles.inputBox}>
                    <TextField
                        className={styles.field}
                        placeholder="0000 0000 0000 0000"
                        type="text"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CreditCardIcon sx={{color: "#c2c2c2"}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to={`/transfer/${card}`} className={styles.link}>
                        <ButtonWithArrow/>
                    </Link>
                </Box>
            </Box>
            <Box
                className={`${styles.box} ${
                    theme === "light" ? styles.boxLight : styles.boxDark
                }`}
            >
                <Box className={styles.titleBox}>
                    <img src={Phone} alt=""/>
                    <h3>{t("homepage.topUpPhone")}</h3>
                </Box>
                <Box className={styles.inputBox}>
                    <TextField
                        className={styles.field}
                        type="text"
                        placeholder="+380 0000000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="standard"
                    />
                    <Link to={`/top-up-phone/${phone}`} className={styles.link}>
                        <ButtonWithArrow/>
                    </Link>
                </Box>
            </Box>
            <Box
                className={`${styles.box} ${
                    theme === "light" ? styles.boxLight : styles.boxDark
                }`}
            >
                <Box className={styles.titleBox}>
                    <img src={IBAN} alt=""/>
                    <h3>{t("homepage.payment")}</h3>
                </Box>
                <Box className={styles.inputBox}>
                    <TextField
                        className={styles.field}
                        placeholder={"Введите IBan"}
                        type="text"
                        value={iBan}
                        onChange={(e) => setIBan(e.target.value)}
                        variant="standard"
                    />
                    <Link to={`/requisites/${iBan}`} className={styles.link}>
                        <ButtonWithArrow/>
                    </Link>
                </Box>
            </Box>
            <Box
                className={`${styles.boxConverter} ${
                    theme === "light" ? styles.boxConverterLight : styles.boxConverterDark
                }`}
            >
                <Box className={styles.titleBoxConverter}>
                    <img src={Currency} alt=""/>
                    <h3>{t("homepage.currencyConverter")}</h3>
                </Box>
                <Box className={styles.inputBoxConverter}>
                    <Select
                        variant="standard"
                        value={currencyFrom || 'USD'}
                        onChange={(e) => setCurrencyFrom(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        sx={{width: "300px"}}
                        variant="standard"
                        type="number"
                        value={amount || ''}
                        onChange={(e) => setAmount(+e.target.value)}
                    />
                </Box>
                <IconButton onClick={handleConversion}>
                    <HeightIcon/>
                </IconButton>
                <Box className={styles.inputBoxConverter}>
                    <Select
                        variant="standard"
                        value={currencyTo}
                        onChange={(e) => setCurrencyTo(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        sx={{width: "300px"}}
                        variant="standard"
                        disabled
                        value={convertedAmount}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ContainerInput;
