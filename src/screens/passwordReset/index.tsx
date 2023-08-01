import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { sendResetEmail } from "../../config/firebase";
import { Link } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
});

const PasswordReset = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("")

    const passwordResetHandler = async (email: string) => {
        try {
            await sendResetEmail(email);
            alert('Ссылка для сброса пароля отправлена на ваш адрес электронной почты');
        } catch (error) {
            console.log("Error log", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Сброс пароля
                    </Typography>
                    <Box component="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="reset-email"
                            label="Адрес электронной почты"
                            name="reset-email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                passwordResetHandler(email);
                            }}
                            sx={{ mt: 0, mb: 2 }}
                        >
                            Сбросить пароль
                        </Button>
                        <Link to="/">
                            Вернуться к странице входа
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PasswordReset;
