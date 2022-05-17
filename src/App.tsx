import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppBar, Box, Container, CssBaseline, Drawer, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

import Calendar from "./Calendar";
import NavigationMenu from "./NavigationMenu";
import Overview from "./Overview";
import { routes } from "./routes";
import { theme } from "./theme";

const drawerWidth = 240;

const getStyles = () => ({
  appContainer: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
  },
});

function App() {
  const matches = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true,
  });

  const [drawerOpen, setDrawerOpen] = useState(matches);

  useEffect(() => setDrawerOpen(matches), [matches]);

  const classes = getStyles();

  return (
    <Container sx={classes.appContainer} disableGutters>
      <CssBaseline />

      <AppBar sx={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Artem Malysh Todo</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" 
        sx={drawerOpen ? classes.drawerOpen : classes.drawerClose}
        PaperProps={{
          sx: classes.drawerPaper
        }}
        open={drawerOpen}
        variant="persistent"
      >
        <Toolbar />

        <NavigationMenu />
      </Drawer>

      <Box m={3} width="100%">
        <Toolbar />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path={routes.calendar} element={<Calendar />} />
          <Route path={routes.label.path} element={<Overview />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
