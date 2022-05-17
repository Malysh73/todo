import React from "react";
import { Typography, Box } from "@mui/material";

import { useAppSelector } from "../redux/hooks";
import { todosSelectors } from "../redux/reducers/todos";
import Todo from "../Todo";
import { theme } from "../theme";

export const getStyles = () => ({
  dueDate: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),

    "&:first-of-type": {
      marginTop: 0,
    },
  },
  iconContainer: {
    textAlign: "center",
		marginTop: 10
  },
  icon: {
    height: 250,
    margin: theme.spacing(5, 0),
  },
});

function Calendar() {
	const todos = useAppSelector(todosSelectors.selectWithDueDate);
  const classes = getStyles();

  return (
    <Box>
      {todos.length > 0 ? (
        todos.map((value, index, array) => (
          <React.Fragment key={value.id}>
            {value.formatedDueDate !== array[index - 1]?.formatedDueDate ? (
              <Typography sx={classes.dueDate} variant="h5">
                {value.formatedDueDate}
              </Typography>
            ) : null}

            <Todo key={value.id} {...value} />
          </React.Fragment>
        ))
      ) : (
        <Box sx={classes.iconContainer}>
          <Typography variant="h4">All done, you're awesome!</Typography>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(Calendar);
