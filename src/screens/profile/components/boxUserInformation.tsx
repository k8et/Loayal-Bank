import React, {ChangeEvent, FC} from 'react';
import styles from "../style.module.css";
import defaultImg from "../../../assets/img/default.png";
import Button from "@mui/material/Button";
import LogOut from "../../../components/logOut";
import {UserDataTypes} from "../../../types/UserDataTypes";

interface BoxUserInformationProp {
    t: (key: string) => string;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleChangeEmailModalOpen: () => void;
    users: UserDataTypes[]
    handleChangePasswordModalOpen: () => void;
    img?:string
}
const BoxUserInformation:FC<BoxUserInformationProp> = (props) => {
    const {t,handleFileChange,users,handleChangeEmailModalOpen,handleChangePasswordModalOpen,img} = props
    return (
        <div>
            <div className={styles.boxUserInformation}>
                <div className={styles.infBox}>
                    <div className={styles.photoProfile}>
                        <h3>{t("profile.profilePhoto")}</h3>
                        <img
                            className={styles.imgProfile}
                            src={ img || defaultImg}
                            alt=""
                        />
                        <label htmlFor="file-upload" className="custom-file-upload">
                            {t("profile.uploadImage")}
                        </label>
                        <input
                            id="file-upload"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.aboutU}>
                        <div className={styles.fib}>
                            <h3>{t("profile.lastName")}:</h3>
                            <p>{users?.[0]?.data?.lastName}</p>
                        </div>
                        <div className={styles.fib}>
                            <h3>{t("profile.firstName")}:</h3>
                            <div>
                                <p>{users?.[0]?.data?.name}</p>
                            </div>
                        </div>
                        <div className={styles.fib}>
                            <h3>{t("profile.phoneNumber")}:</h3>
                            <p>{users?.[0]?.data?.phone}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangeEmailModalOpen}
                        className={styles.button}
                    >
                        {t("profile.changeEmail")}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePasswordModalOpen}
                        className={styles.button}
                    >
                        {t("profile.changePassword")}
                    </Button>
                    <LogOut t={t}/>
                </div>
            </div>
        </div>
    );
};

export default BoxUserInformation;