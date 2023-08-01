import React, {FC} from 'react';
import {logout} from "../../config/firebase";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

interface LogOutProps{
    t: (key: string) => string;
}
const LogOut:FC<LogOutProps> = (props) => {
    const {t} = props
    const navigate = useNavigate()
    const logOutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.log("Error log", error);
        } finally {
            navigate('/')
        }
    };
    return (
      <div>
        <Button variant="contained" onClick={logOutHandler}>
          {t("profile.logOut")}
        </Button>
      </div>
    );
};

export default LogOut;