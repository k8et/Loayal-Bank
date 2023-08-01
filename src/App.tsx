import React from 'react';
import Navigation from "./navigation";
import {ThemeProvider} from "./components/themeProvider";

const App = () => {
    return (
        <ThemeProvider>
             <Navigation/>
        </ThemeProvider>
    );
};

export default App;