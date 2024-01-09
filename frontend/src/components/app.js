import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme'; // Import your custom theme

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const gradientBackground = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-1",
      background: "linear-gradient(to bottom, #0074D9, #119BD6)",
    };

    const contentStyle = {
      width: "100%",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      alignContent: "center",
      textAlign: "center",
      zIndex: "1",
    };

    return (
      <ThemeProvider theme={customTheme}>
      <div>
        <div style={gradientBackground}></div>
        <div style={contentStyle}>
          <HomePage />
        </div>
      </div>
      </ThemeProvider>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
