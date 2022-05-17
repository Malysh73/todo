import React, { useState, memo } from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import { labelsSelectors } from "../redux/reducers/labels";
import { TState } from "../redux/store";
import { todosActions, todosSelectors } from "../redux/reducers/todos";
import Todo from "../Todo";

export const getStyles = () => ({
  textfield: {
    margin: 0,
  },
  button: {
    height: "100%",
  },
});

function Overview() {
  const classes = getStyles();

  const { id: labelId } = useParams<{ id: string }>();
  const label = useAppSelector((state: TState) => labelsSelectors.selectById(state, labelId ? labelId : ''));

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [showDone, setShowDone] = useState(false);

  const todos = useAppSelector((state: TState) => (showDone ? todosSelectors.selectAll(state, labelId) : todosSelectors.selectAllIncomplete(state, labelId)));
  const finishedCount = useAppSelector((state: TState) => todosSelectors.selectAll(state, labelId).length - todosSelectors.selectAllIncomplete(state, labelId).length);
  const dispatch = useAppDispatch();

  return (
    <>
      {todos.map((value) => (
        <Todo key={value.id} {...value} />
      ))}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={10}>
          <TextField
            sx={classes.textfield}
            fullWidth
            onChange={(event) => setNewTodoTitle(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter" && newTodoTitle.length > 0) {
                const labels = labelId ? [labelId] : [];
                dispatch(todosActions.create({ title: newTodoTitle, labels }));
                setNewTodoTitle("");
              }
            }}
            placeholder="Plan something new"
            value={newTodoTitle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Add />
                </InputAdornment>
              ),
              endAdornment: (label ? label.title : null),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Button
            sx={classes.button}
            fullWidth
            onClick={() => setShowDone(!showDone)}
            size="medium"
            startIcon={showDone ? <VisibilityOff /> : <Visibility />}
            variant="text"
        >
            Done ({finishedCount})
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Overview);
