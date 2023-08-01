import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
});
export const sxBox = {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}
export const sxButton = {mt: 0, mb: 2}