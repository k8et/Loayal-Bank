import React, {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../config/firebase";
import {observer} from "mobx-react";
import {
    Box,
    Button,
} from "@mui/material";
import styles from "./style.module.css";
import Typography from "@mui/material/Typography";
import {ComponentProps} from "../../types/ComponentProps";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {Transaction} from "../../types/Transaction";
import CustomTableContainer from "./Components/tableContainer";

interface TransactionHistoryProps extends ComponentProps{
    userId: string | undefined
}
const TransactionHistory: React.FC<TransactionHistoryProps> = observer((props) => {
    const {t, theme, userId} = props;
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const exportToCSV = (
        csvData: any[],
        fileName: string,
        headers: string[],
        description: string
    ) => {
        return [
            [description],
            headers,
            ...csvData.map((row) => [
                row.data.date
                    ?.toDate()
                    .toLocaleString("en-GB", {hour12: false})
                    .slice(0, -3),
                row.data.cardNumber,
                ...(description === "Пополнения карты"
                    ? [row.data.amount + " UAH"]
                    : []),
                ...(description !== "Пополнения карты"
                    ? [row.data.phoneNumber || row.data.iban || row.data.onCard || ""]
                    : []),
                ...(description !== "Пополнения карты"
                    ? [row.data.amount + " UAH"]
                    : []),
            ]),
        ];
    };

    const downloadTransactions = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const mergedData = [
            ...exportToCSV(
                cardTransfers,
                "Card Transfers",
                ["Дата", "Номер карты", "На карту", "Сумма"],
                "Переводы с карты на карту"
            ),
            ...exportToCSV(
                ibanTransfers,
                "IBAN Transfers",
                ["Дата", "Номер карты", "Номер IBAN", "Сумма"],
                "Переводы по IBAN"
            ),
            ...exportToCSV(
                phoneTopUps,
                "Phone Top Ups",
                ["Дата", "Номер карты", "Номер телефона", "Сумма"],
                "Пополнения телефона"
            ),
            ...exportToCSV(
                cardTopUps,
                "Card Top Ups",
                ["Дата", "Номер карты", "Сумма"],
                "Пополнения карты"
            ),
        ];

        const ws = XLSX.utils.aoa_to_sheet(mergedData);
        const wb = {Sheets: {transactions: ws}, SheetNames: ["transactions"]};

        const columnWidths = mergedData.reduce((acc, row) => {
            row.forEach((cell, columnIndex) => {
                const cellWidth = cell.toString().length * 1.5;
                if (!acc[columnIndex] || cellWidth > acc[columnIndex]) {
                    acc[columnIndex] = cellWidth;
                }
            });
            return acc;
        }, []);
        ws["!cols"] = columnWidths.map((width) => ({width}));

        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});

        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "transactions" + fileExtension);
    };

    useEffect(() => {
        fetchTransactions().then((r) => r);
    }, [userId]);
    const fetchTransactions = async () => {
        const transactionsRef = collection(db, "transactions");
        const transactionsQuery = query(
            transactionsRef,
            where("userId", "==", userId)
        );

        const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
            const transactionsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));


            setTransactions(transactionsData);
        });

        return () => unsubscribe();
    };

    const cardTransfers = transactions.filter(
        (transaction) => transaction.data.type === "transfer.transferType"
    );
    const ibanTransfers = transactions.filter(
        (transaction) => transaction.data.type === "Перевод по IBAN"
    );
    const phoneTopUps = transactions.filter(
        (transaction) => transaction.data.type === "Пополнение"
    );
    const cardTopUps = transactions.filter(
        (transaction) => transaction.data.type === "Card Top-Up"
    );

    return (
        <div
            className={`${styles.container} ${
                theme === "dark" ? styles.darkTheme : styles.lightTheme
            }`}
        >
            <Box sx={{display: "flex", gap: "30px", marginTop: "10px"}}>
                <Typography variant="h4" className={styles.title}>
                    {t("transactionHistory.title")}
                </Typography>
                <Button
                    size={"small"}
                    variant="outlined"
                    onClick={downloadTransactions}
                >
                    {t("transactionHistory.downloadAllTransactions")}
                </Button>
            </Box>
            <Typography variant="h6" className={styles.subtitle}>
                {t("transactionHistory.cardToCardTransfers")}
            </Typography>
            <CustomTableContainer
                theme={theme}
                t={t}
                cardTransfers={cardTransfers}
                ibanTransfers={ibanTransfers}
                phoneTopUps={phoneTopUps}
                cardTopUps={cardTopUps}
            />
        </div>
    );
});

export default TransactionHistory;
