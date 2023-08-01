import React, { FC } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import styles from "../style.module.css";
import Typography from "@mui/material/Typography";
import { Transaction } from "../../../types/Transaction";

interface CustomTableContainerProps {
  theme: "dark" | "light";
  t: (key: string) => string;
  cardTransfers: Transaction[];
  ibanTransfers: Transaction[];
  phoneTopUps: Transaction[];
  cardTopUps: Transaction[];
}

const CustomTableContainer: FC<CustomTableContainerProps> = ({
  theme,
  t,
  cardTransfers,
  ibanTransfers,
  phoneTopUps,
  cardTopUps,
}) => {
  return (
    <>
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.date")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.cardNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.recipientCard")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.amount")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardTransfers.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.data.date &&
                    transaction.data.date
                      .toDate()
                      .toLocaleString()
                      .slice(0, -3)}
                </TableCell>
                <TableCell>{transaction.data.cardNumber}</TableCell>
                <TableCell>{transaction.data.onCard}</TableCell>
                <TableCell>{transaction.data.amount} UAH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" className={styles.subtitle}>
        {t("transactionHistory.ibanTransfers")}
      </Typography>
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.date")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.cardNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.ibanNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.amount")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ibanTransfers.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.data.date &&
                    transaction.data.date
                      .toDate()
                      .toLocaleString()
                      .slice(0, -3)}
                </TableCell>
                <TableCell>{transaction.data.cardNumber}</TableCell>
                <TableCell>{transaction.data.iban}</TableCell>
                <TableCell>{transaction.data.amount} UAH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" className={styles.subtitle}>
        {t("transactionHistory.phoneTopUps")}
      </Typography>
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.date")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.cardNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.phoneNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.amount")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phoneTopUps.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.data.date &&
                    transaction.data.date
                      .toDate()
                      .toLocaleString()
                      .slice(0, -3)}
                </TableCell>
                <TableCell>{transaction.data.cardNumber}</TableCell>
                <TableCell>{transaction.data.phoneNumber}</TableCell>
                <TableCell>{transaction.data.amount} UAH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" className={styles.subtitle}>
        {t("transactionHistory.cardTopUps")}
      </Typography>
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.date")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {" "}
                {t("transactionHistory.cardNumber")}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f2f2f2",
                }}
              >
                {t("transactionHistory.amount")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardTopUps.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.data.date &&
                    transaction.data.date
                      .toDate()
                      .toLocaleString()
                      .slice(0, -3)}
                </TableCell>
                <TableCell>{transaction.data.cardNumber}</TableCell>
                <TableCell>{transaction.data.amount} UAH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTableContainer;
