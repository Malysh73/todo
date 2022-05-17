import React from "react";
import { Chip } from "@mui/material";

import { useAppSelector } from "../redux/hooks";
import { labelsSelectors } from "../redux/reducers/labels";
import { TState } from "../redux/store";

import { Todo } from "../types";
import { theme } from "../theme";

export const getStyles = () => ({
  label: {
    marginLeft: theme.spacing(1),
  },
});

function LabelsPreview({ value }: { value: Todo["labels"] }) {
  const labels = useAppSelector((state: TState) => labelsSelectors.selectByIds(state, value));
  const classes = getStyles();

  return (
    <>
      {labels.map((label) => (
        <Chip sx={classes.label} label={label.title} key={label.id} />
      ))}
    </>
  );
}

export default React.memo(LabelsPreview);
