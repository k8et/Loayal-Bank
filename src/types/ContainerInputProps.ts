import React from "react";

export interface ContainerInputProps {
    card: string;
    setCard: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    iBan: string;
    setIBan: React.Dispatch<React.SetStateAction<string>>;
    currencyFrom: string;
    setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
    currencyTo: string;
    setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
    amount: number | "";
    setAmount: React.Dispatch<React.SetStateAction<number | "">>;
    currencies: string[];
    t: (key: string) => string;
    convertedAmount: number | "";
    handleConversion: () => void;
    theme: "light" | "dark";
  }