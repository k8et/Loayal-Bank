import React, { FC } from "react";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { auth } from "../../../config/firebase";
import Button from "@mui/material/Button";
import styles from "../style.module.css";

interface ModalPasswordChangeProps {
  changePasswordModalOpen: boolean;
  handleChangePasswordModalClose: () => void;
  oldPassword: string;
  setOldPassword: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  updatePasswords: () => void;
  t: (key: string) => string;
  theme: "dark" | "light";
}

const ModalPasswordChange: FC<ModalPasswordChangeProps> = (props) => {
  const {
    changePasswordModalOpen,
    handleChangePasswordModalClose,
    t,
    oldPassword,
    setOldPassword,
    password,
    setPassword,
    updatePasswords,
    theme,
  } = props;
  return (
    <Modal
      open={changePasswordModalOpen}
      onClose={handleChangePasswordModalClose}
    >
      <Box className={styles.modalContainer}>
        <form
          className={styles.modalContent}
          style={{ backgroundColor: theme == "dark" ? "#212121" : "white" }}
        >
          <h2
            style={{ color: theme == "dark" ? "#f5f5f5" : "#212121" }}
          >
            {t("profile.changePassword")}
          </h2>
          <TextField
            label={t("profile.email")}
            value={auth.currentUser?.email}
            disabled
            variant="outlined"
            className={styles.textField}
          />
          <TextField
            label={t("profile.oldPassword")}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            variant="outlined"
            className={styles.textField}
          />
          <TextField
            label={t("profile.newPassword")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className={styles.textField}
          />
          <Button variant="contained" color="primary" onClick={updatePasswords}>
            {t("profile.saveChanges")}
          </Button>
          <Button onClick={handleChangePasswordModalClose}>Close</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalPasswordChange;
