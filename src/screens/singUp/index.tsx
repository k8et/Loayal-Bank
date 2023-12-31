import React, { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { db, register } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { formBoxStyles, theme } from "./style";
import { Snackbar, SnackbarContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const RegisterScreen: FC = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("+380");
  const [notification, setNotification] = useState<{ message: string} | null>(null);
  const navigate = useNavigate();
  const showNotification = (message: any) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), 5000);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerHandler = async (
      email: string,
      password: string,
      name: string,
      lastName: string,
      phone: string
    ) => {
      try {
        const { user } = await register(email, password);
        await addDoc(collection(db, "users"), {
          userId: user.uid,
          name,
          lastName,
          phone
        });
        navigate("/home");
      } catch (error: any) {
        showNotification(error.toString().slice(24))
      }
    };
    registerHandler(email, password, name, lastName, phone).then(r => r);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={formBoxStyles}
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="displayName"
                required
                fullWidth
                id="displayName"
                label="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                required
                fullWidth
                label="Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{
                  pattern: "\\+380[0-9]{9}"
                }}
                helperText="Телефон формата: +380XXXXXXXXX"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link style={{ textDecoration: "none" }} to="/signIn">У вас уже есть аккаунт? Войти</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={5000}
        onClose={() => setNotification(null)}
      >
        <SnackbarContent
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: theme.palette.error.dark,
          }}
          message={notification?.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setNotification(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </ThemeProvider>
  );
};

export default RegisterScreen;
