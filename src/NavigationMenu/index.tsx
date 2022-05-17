import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { useAppSelector } from "../redux/hooks"; 
import { labelsSelectors } from "../redux/reducers/labels";
import { todosSelectors } from "../redux/reducers/todos";
import { routes } from "../routes";
import { theme } from "../theme";

const getStyles = () => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  linkActive: {
    background: 'red',
  },
});

function NavigationMenu() {
  const classes = getStyles();
  const [open, setOpen] = React.useState(true);
  const labels = useAppSelector(labelsSelectors.selectAll);
  const todos = useAppSelector(todosSelectors.selectAllIncomplete);
  const path = useLocation().pathname;

  return (
    <List component="nav">
      <ListItemButton component={NavLink} selected={path === routes.overview} to={routes.overview}>
        <ListItemText primary="Overview" />
      </ListItemButton>

      <ListItemButton component={NavLink} selected={path === routes.calendar} to={routes.calendar}>
        <ListItemText primary="Calendar" />
      </ListItemButton>

      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary="Labels" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {labels.map((label) => (
            <ListItemButton component={NavLink} selected={path === routes.label.to(label.id)} to={routes.label.to(label.id)} sx={classes.nested} key={label.id}>
              <ListItemText secondary={`${label.title} (${todos.filter(todo => todo.labels.includes(label.id)).length})`} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default React.memo(NavigationMenu);
