import React, {ChangeEvent, FC} from 'react';
import Box from "@mui/material/Box";
import styles from "../style.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import {auth} from "../../../config/firebase";


interface ModalEmailChangeProps {
    t: (key: string) => string;
    handleChangeEmailModalClose: () => void;
    changeEmailModalOpen: boolean;
    email: string;
    setEmail: (email: string) => void;
    oldPassword: string;
    setOldPassword: (oldPassword: string) => void;
    updateEmails: () => void;
    theme: 'dark' | 'light'
}

const ModalEmailChange: FC<ModalEmailChangeProps> = (props) => {
    const {
        t,
        handleChangeEmailModalClose,
        changeEmailModalOpen,
        email,
        setEmail,
        oldPassword,
        setOldPassword,
        updateEmails,
        theme
    } = props;

    return (
        <Modal
            open={changeEmailModalOpen}
            onClose={handleChangeEmailModalClose}
        >
            <Box className={styles.modalContainer}>
                <form
                    className={styles.modalContent}
                    style={{ backgroundColor: theme == "dark" ? "#212121" : "white" }}
                >
                    <h2
                        style={{ color: theme == "dark" ? "#f5f5f5" : "#212121" }}
                    >
                        {t("profile.changeEmail")}
                    </h2>
                    <TextField
                        label={t("profile.oldEmail")}
                        value={auth.currentUser?.email}
                        disabled
                        variant="outlined"
                        className={styles.textField}
                    />
                    <TextField
                        label={t("profile.newEmail")}
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        variant="outlined"
                        className={styles.textField}
                    />
                    <TextField
                        label={t("profile.oldPassword")}
                        type="password"
                        value={oldPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setOldPassword(e.target.value)
                        }
                        variant="outlined"
                        className={styles.textField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={updateEmails}
                        className={styles.button}
                    >
                        {t("profile.saveChanges")}
                    </Button>
                    <Button onClick={handleChangeEmailModalClose}>
                        {t("profile.close")}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalEmailChange;