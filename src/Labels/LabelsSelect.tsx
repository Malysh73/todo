import React from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { useAppSelector } from "../redux/hooks";
import { labelsSelectors } from "../redux/reducers/labels";

function LabelsSelect({ SelectProps, ...rest }: Partial<TextFieldProps>) {
  const labels = useAppSelector(labelsSelectors.selectAll);

  return (
    <TextField fullWidth label="Labels" select SelectProps={{ multiple: true, ...SelectProps }} {...rest}>
      {labels.map((label) => (
        <MenuItem key={label.id} value={label.id}>
          {label.title}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default React.memo(LabelsSelect);
