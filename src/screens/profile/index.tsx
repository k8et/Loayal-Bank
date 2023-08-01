import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "./style.module.css";
import {ComponentProps} from "../../types/ComponentProps";
import BoxUserInformation from "./components/boxUserInformation";
import UploadDocuments from "./components/uploadDocuments";
import ModalEmailChange from "./components/modalEmailChange";
import {auth} from "../../config/firebase";
import ModalPasswordChange from "./components/modalPasswordChange";
import {
    handelDownloadImg,
    handlePassportData,
    updateEmails,
    updatePasswords,
    uploadFile,
    uploadPassportData,
} from "./components/autFunction";
import getDataStore from "../../stores/getDataFirebase";
import {observer} from "mobx-react";
import {PassportData} from "../../types/PassportData";

const Profile: React.FC<ComponentProps> = observer((props) => {
    const {t, theme} = props;
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [passportSeries, setPassportSeries] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [passportIssueDate, setPassportIssueDate] = useState("");
    const [passportIssuedBy, setPassportIssuedBy] = useState("");
    const [passportData, setPassportData] = useState<PassportData[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [changeEmailModalOpen, setChangeEmailModalOpen] = useState(false);
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {users} = getDataStore
    const user = auth.currentUser?.uid;
    const img = getDataStore.users?.[0]?.data?.imageUrl;
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleChangeEmailModalOpen = () => {
        setChangeEmailModalOpen(true);
    };
    const handleChangeEmailModalClose = () => {
        setChangeEmailModalOpen(false);
    };
    const handleChangePasswordModalOpen = () => {
        setChangePasswordModalOpen(true);
    };
    const handleChangePasswordModalClose = () => {
        setChangePasswordModalOpen(false);
    };
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };
    useEffect(() => {
        handlePassportData(user, setPassportData);
        handelDownloadImg(user);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getDataStore.getData('users', getDataStore.setUser);
            }
        });
        return unsubscribe();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            uploadFile(selectedFile, setSelectedFile);
        }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div
            className={`${styles.main} ${
                theme === "dark" ? styles.darkTheme : styles.lightTheme
            }`}
        >
            <div
                className={`${styles.profileContainer} ${
                    theme === "dark"
                        ? styles.profileContainerDarkTheme
                        : styles.profileContainerLightTheme
                }`}
            >
                <Tabs className={styles.tabs} value={tab} onChange={handleTabChange}>
                    <Tab label={t("profile.settingsTab")}/>
                    <Tab label={t("profile.documentsTab")}/>
                </Tabs>
                {tab === 0 ? (
                    <BoxUserInformation
                        t={t}
                        handleFileChange={handleFileChange}
                        users={users}
                        img={img}
                        handleChangeEmailModalOpen={handleChangeEmailModalOpen}
                        handleChangePasswordModalOpen={handleChangePasswordModalOpen}
                    />
                ) : tab === 1 && (
                    <UploadDocuments
                        t={t}
                        passportData={passportData}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        modalOpen={modalOpen}
                        uploadPassportData={() =>
                            uploadPassportData(
                                passportSeries,
                                passportNumber,
                                passportIssueDate,
                                passportIssuedBy,
                                surname,
                                username,
                                setModalOpen
                            )
                        }
                        username={username}
                        setUsername={setUsername}
                        surname={surname}
                        setSurname={setSurname}
                        passportSeries={passportSeries}
                        setPassportSeries={setPassportSeries}
                        passportNumber={passportNumber}
                        setPassportNumber={setPassportNumber}
                        passportIssueDate={passportIssueDate}
                        setPassportIssueDate={setPassportIssueDate}
                        passportIssuedBy={passportIssuedBy}
                        setPassportIssuedBy={setPassportIssuedBy}
                        theme={theme}
                    />
                )}
                <ModalEmailChange
                    theme={theme}
                    t={t}
                    handleChangeEmailModalClose={handleChangeEmailModalClose}
                    changeEmailModalOpen={changeEmailModalOpen}
                    email={email}
                    setEmail={setEmail}
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    updateEmails={() => updateEmails(oldPassword, email, t)}
                />
                <ModalPasswordChange
                    theme={theme}
                    changePasswordModalOpen={changePasswordModalOpen}
                    handleChangePasswordModalClose={handleChangePasswordModalClose}
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    password={password}
                    setPassword={setPassword}
                    updatePasswords={() => updatePasswords(oldPassword, password, t)}
                    t={t}
                />
            </div>
        </div>
    );
});

export default Profile;
