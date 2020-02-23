import { ThemeProvider } from "@material-ui/core";
import { render } from "@testing-library/react";
import { createBrowserHistory } from "history";
import React from 'react';
import { Router } from "react-router-dom";
import App from "../App";
import { getTheme } from '../theme';

interface Option {
  width?: number;
  path?: string;
}

export function renderApp(rawOptions: Option = {}) {
  const options = { width: 600, path: '/', ...rawOptions };
  const theme = getTheme();

  const matchMediaPolyfill = require('mq-polyfill').default;
  matchMediaPolyfill(window);

  (window as any).innerWidth = options.width;
  const history = createBrowserHistory();
  history.replace(options.path);

  const queries = render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>);
  return { queries, history }
}