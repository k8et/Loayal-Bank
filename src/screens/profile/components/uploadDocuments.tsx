import React, {ChangeEvent, FC} from "react";
import Button from "@mui/material/Button";
import styles from "../style.module.css";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface UploadDocumentsProps {
    t: (key: string) => string;
    handleModalOpen: () => void;
    handleModalClose: () => void;
    modalOpen: boolean;
    uploadPassportData: () => void;
    username: string;
    setUsername: (name: string) => void;
    surname: string;
    setSurname: (surname: string) => void;
    passportSeries: string;
    setPassportSeries: (passportSeries: string) => void;
    passportNumber: string;
    setPassportNumber: (passportNumber: string) => void;
    passportIssueDate: string;
    setPassportIssueDate: (passportIssueDate: string) => void;
    passportIssuedBy: string;
    setPassportIssuedBy: (passportIssuedBy: string) => void;
    passportData: any[];
    theme: "dark" | 'light'
}

const UploadDocuments: FC<UploadDocumentsProps> = (props) => {
    const {
        handleModalOpen,
        username,
        modalOpen,
        handleModalClose,
        setUsername,
        t,
        surname,
        setSurname,
        passportNumber,
        passportSeries,
        setPassportSeries,
        setPassportNumber,
        setPassportIssuedBy,
        setPassportIssueDate,
        passportIssueDate,
        passportIssuedBy,
        uploadPassportData,
        passportData,
        theme
    } = props;
    return (
        <div className={styles.documentContainer}>
            <div className={styles.documentContainerBox}>
                {passportData.length === 0 ? (
                    <div>{t("profile.alertDoc")}</div>
                ) : (
                    passportData.map((item, index) => (
                        <div key={index} className={styles.document}>
                            <div>
                                <h3> {t("profile.name")}:</h3>
                                <p>{item.name}</p>
                            </div>
                            <div>
                                <h3>{t("profile.surname")}:</h3>
                                <p>{item.surname}</p>
                            </div>
                            <div>
                                <h3>{t("profile.passportSeries")}:</h3>
                                <p>{item.series}</p>
                            </div>
                            <div>
                                <h3>{t("profile.passportNumber")}:</h3>
                                <p>{item.number}</p>
                            </div>
                            <div>
                                <h3>{t("profile.passportIssueDate")}:</h3>
                                <p>{item.issueDate}</p>
                            </div>
                            <div>
                                <h3>{t("profile.passportIssueDate")}:</h3>
                                <p>{item.issuedBy}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleModalOpen}
                className={styles.button}
            >
                {t("profile.uploadDocuments")}
            </Button>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box className={styles.modalContainer}>
                    <form className={styles.modalContent}
                          style={{backgroundColor: theme == "dark" ? "#212121" : "white"}}>
                        <h2 style={{color: theme == "dark" ? "#f5f5f5" : "#212121"}}>
                            {t("profile.uploadDocuments")}
                        </h2>
                        <TextField
                            label={t("profile.name")}
                            value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <TextField
                            label={t("profile.surname")}
                            value={surname}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSurname(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <TextField
                            label={t("profile.passportSeries")}
                            value={passportSeries}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassportSeries(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <TextField
                            label={t("profile.passportNumber")}
                            value={passportNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassportNumber(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <TextField
                            label={t("profile.passportIssueDate")}
                            value={passportIssueDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassportIssueDate(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <TextField
                            label={t("profile.passportIssuedBy")}
                            value={passportIssuedBy}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassportIssuedBy(e.target.value)
                            }
                            variant="outlined"
                            className={styles.textField}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={uploadPassportData}
                            className={styles.button}
                        >
                            {t("profile.uploadPassportData")}
                        </Button>
                        <Button onClick={handleModalClose}>{t("profile.close")}</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UploadDocuments;
