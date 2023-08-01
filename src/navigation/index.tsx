import React, {FC, useContext, useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import RegisterScreen from "../screens/singUp";
import SignIn from "../screens/signIn";
import LeftSide from "../components/layout/leftSide";
import Header from "../components/layout/header";
import TopUp from "../screens/topUp";
import Transfer from "../screens/transfer";
import TopUpPhone from "../screens/topUpPhone";
import BlockCard from "../screens/blockCard";
import TransactionHistory from "../screens/transactionHistory";
import Requisites from "../screens/requisites";
import Cards from "../screens/cards";
import HomePage from "../screens/homePage";
import Profile from "../screens/profile";
import PasswordReset from "../screens/passwordReset";
import ChatBot from "../components/chatBot";
import {ThemeContext} from "../components/themeProvider";
import {useTranslation} from "react-i18next";
import dataStore from "../stores/fetchData";
import {Currency} from "../types/CurrencyProp";
import styles from "./style.module.css";
import {auth} from "../config/firebase";
import getDataStore from "../stores/getDataFirebase";
import {observer} from "mobx-react";

const Navigation: FC = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const {date} = getDataStore
    const isLoginPage = location.pathname === "/";
    const isRegisterPage = location.pathname === "/signIn";
    const isPasswordReset = location.pathname === "/password-reset";
    const isChatBotPage = !(isLoginPage || isRegisterPage || isPasswordReset);
    const [userId, setUserId] = useState<string | undefined>("");
    const [currency, setCurrency] = useState<Currency>({});
    const {t} = useTranslation();
    const themeContext = useContext(ThemeContext);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dataStore
                    .fetchData(
                        "https://v6.exchangerate-api.com/v6/d124b21f0ba10987b5ad7399/latest/USD"
                    )
                    .then(() => {
                        setCurrency(dataStore.data.conversion_rates);
                    });
                if (!user) {
                    navigate("/");
                }
                auth.onAuthStateChanged((user) => {
                    setUserId(user ? user.uid : undefined);
                });
            }
        });
        getDataStore.getData("cards", getDataStore.setData);
    }, []);

    if (!themeContext) {
        return null;
    }
    const {theme} = themeContext;
    return (
        <div className={styles.main}>
            {!isLoginPage && !isRegisterPage && !isPasswordReset && <LeftSide/>}
            <div className={styles.headerItem}>
                {!isLoginPage && !isRegisterPage && !isPasswordReset && (
                    <Header currency={currency} t={t}/>
                )}
                <Routes>
                    <Route
                        path="/cards"
                        element={
                            <Cards
                                userCards={date}
                                userId={userId}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route path="/" element={<RegisterScreen/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route
                        path="/top-up"
                        element={
                            <TopUp
                                userId={userId}
                                userCards={date}
                                currency={currency}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/transfer/:card"
                        element={
                            <Transfer
                                userId={userId}
                                userCards={date}
                                currency={currency}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/transfer"
                        element={
                            <Transfer
                                userId={userId}
                                userCards={date}
                                currency={currency}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/top-up-phone"
                        element={
                            <TopUpPhone
                                userId={userId}
                                userCards={date}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/top-up-phone/:phone"
                        element={
                            <TopUpPhone
                                userId={userId}
                                userCards={date}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/block-card"
                        element={<BlockCard userCards={date} theme={theme} t={t}/>}
                    />
                    <Route
                        path="/transaction-history"
                        element={
                            <TransactionHistory userId={userId} theme={theme} t={t}/>
                        }
                    />
                    <Route
                        path="/requisites"
                        element={
                            <Requisites
                                userId={userId}
                                userCards={date}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/requisites/:iBan"
                        element={
                            <Requisites
                                userId={userId}
                                userCards={date}
                                theme={theme}
                                t={t}
                            />
                        }
                    />
                    <Route
                        path="/home"
                        element={<HomePage theme={theme} currency={currency} t={t}/>}
                    />
                    <Route path="/profile" element={<Profile theme={theme} t={t}/>}/>
                    <Route path="/password-reset" element={<PasswordReset/>}/>
                </Routes>
            </div>
            {isChatBotPage && <ChatBot/>}
        </div>
    );
});

export default Navigation;
