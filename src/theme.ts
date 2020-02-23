import { createMuiTheme } from "@material-ui/core";

export function getTheme() {
  return createMuiTheme({
    breakpoints: { values: { xs: 0, sm: 375, md: 600, lg: 960, xl: 1280 } }
  });
}