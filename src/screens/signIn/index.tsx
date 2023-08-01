import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import {Link, useNavigate} from "react-router-dom";
import {sxButton, sxBox, theme} from "./style";
import {login} from "../../config/firebase";





const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const loginHandler = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container  maxWidth="xs">
        <CssBaseline />
        <Box sx={sxBox}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault()
                loginHandler(email, password).then(r => r);
              }}
              sx={sxButton}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/password-reset">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" >
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
