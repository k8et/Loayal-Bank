import React from 'react';
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import i18n from "i18next";

const SwitcherLanguage = () => {
    const handleLanguageChange = (event: SelectChangeEvent) => {
        if (event) {
            i18n.changeLanguage(event.target.value).then(r => r);
        }
    };
    return (
        <Select
            variant={"standard"}
            size={"small"}
            value={i18n.language || 'ru'}
            onChange={handleLanguageChange}
            sx={{color: "Black"}}
        >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"ru"}>Русский</MenuItem>
        </Select>
    );
};

export default SwitcherLanguage;