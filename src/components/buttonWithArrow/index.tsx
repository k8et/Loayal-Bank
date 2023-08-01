import React from 'react';
import {Button} from "@mui/material";
import styles from "../../screens/homePage/style.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ButtonWithArrow = () => {
    return (
        <Button style={{marginLeft: '16px', marginRight: '16px'}} className={styles.button}>
            <ChevronRightIcon sx={{color: "black"}}/>
        </Button>
    );
};

export default ButtonWithArrow;