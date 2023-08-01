import React, {FC, useState} from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import SwitcherLanguage from "../switcherLanguage";
import ThemeSwitcher from "../themeSwitcher";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {Link} from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import {styles} from "./style";

interface BurgerMenuProps {
    t: (key: string) => string;
    theme: "dark" | "light";
}


const BurgerMenu: FC<BurgerMenuProps> = ({t, theme}) => {
        const [open, setOpen] = useState(false);

        const toggleDrawer = (open: boolean) => (
            event: React.KeyboardEvent | React.MouseEvent
        ) => {
            if (event.type === "keydown") {
                return;
            }
            setOpen(open);
        };
        const handleLinkClick = () => {
            setOpen(false);
        };

        const link = {
            color: theme === "dark" ? "white" : "black",
            textDecoration: "none"
        }

        return (
            <AppBar position="absolute" sx={styles.appBar}>
                <DragHandleIcon
                    style={styles.dragHandleIcon}
                    onClick={toggleDrawer(true)}
                />

                <Container maxWidth="lg">
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={toggleDrawer(false)}
                    >
                        <Box sx={styles.drawerContainer}>
                            <IconButton sx={styles.closeButton}>
                                <CloseIcon onClick={toggleDrawer(false)}/>
                            </IconButton>

                            <Divider sx={styles.divider}/>

                            <Box sx={styles.listItemButtonContainer}>
                                <ListItemButton sx={styles.list}>
                                    <WidgetsIcon sx={styles.widget}/>
                                    <Link
                                        to="/home"
                                        style={link}
                                        onClick={handleLinkClick}
                                    >
                                        {t("leftSide.myBank")}
                                    </Link>
                                </ListItemButton>
                                <ListItemButton sx={styles.list}>
                                    <CreditCardIcon sx={styles.widget}/>
                                    <Link
                                        to="/cards"
                                        style={link}
                                        onClick={handleLinkClick}
                                    >
                                        {t("leftSide.myCard")}
                                    </Link>
                                </ListItemButton>
                                <ListItemButton sx={styles.list}>
                                    <PaymentsIcon sx={styles.widget}/>
                                    <Link
                                        to="/requisites"
                                        style={link}
                                        onClick={handleLinkClick}
                                    >
                                        {t("leftSide.payment")}
                                    </Link>
                                </ListItemButton>
                                <ListItemButton sx={styles.list}>
                                    <HistoryIcon sx={styles.widget}/>
                                    <Link
                                        to="/transaction-history"
                                        style={link}
                                        onClick={handleLinkClick}
                                    >
                                        {t("leftSide.history")}
                                    </Link>
                                </ListItemButton>
                                <ListItemButton sx={styles.list}>
                                    <PersonIcon sx={styles.widget}/>
                                    <Link to="/profile"
                                          style={link}
                                          onClick={handleLinkClick}
                                    >
                                        {t("leftSide.myProfile")}
                                    </Link>
                                </ListItemButton>
                            </Box>

                            <Box sx={styles.bottomBox}>
                                <SwitcherLanguage/>
                                <ThemeSwitcher/>
                            </Box>
                        </Box>
                    </Drawer>
                </Container>
            </AppBar>
        )
            ;
    }
;

export default BurgerMenu;
