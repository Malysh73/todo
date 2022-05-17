import React, { useCallback, useMemo, memo } from "react";
import { format } from "date-fns";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Grid, Hidden, Input, MenuItem, TextField, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useAppDispatch } from "../redux/hooks";
import { todosActions } from "../redux/reducers/todos";
import LabelsPreview from "../Labels/LabelsPreview";
import LabelsSelect from "../Labels/LabelsSelect";
import { dateFormat, Todo as TodoClass, TTodoPriority } from "../types";
import { getStyles } from "./styles";

function Todo({ id, title, description, completionDate, dueDate, labels, priority }: TodoClass) {
  const dispatch = useAppDispatch();

  const remove = useCallback(() => dispatch(todosActions.remove(id)), [id, dispatch]);
  const update = useCallback((changes: any) => dispatch(todosActions.update({ id: id, changes })), [id, dispatch]);

  const overdue = useMemo(() => Boolean(dueDate && new Date() > new Date(dueDate)), [dueDate]);
  const classes = getStyles(overdue, priority);

  return (
    <Box sx={classes.root}>
      <Accordion sx={classes.accordion} TransitionProps={{ unmountOnExit: true }} square>
        <AccordionSummary expandIcon={<ExpandMore />} sx={{".MuiAccordionSummary-content": classes.accordionSummary}}>
          <Box sx={classes.accordionSummaryContent} onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}>
            <Checkbox
              checked={!!completionDate}
              onChange={(event) => {
                update({ completionDate: event.target.checked ? new Date().toISOString() : undefined });
              }}
            />
            <Input sx={classes.title} fullWidth onChange={(event) => update({ title: event.target.value })} value={title} />
            <Hidden smDown>
              <LabelsPreview value={labels} />
            </Hidden>
            {dueDate ? (
              <Typography sx={classes.dueDate} variant="body2">
                {format(new Date(dueDate), "dd.MM.yyyy")}
              </Typography>
            ) : null}
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={classes.accordionDetails}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField fullWidth label="Notes" multiline onChange={(event) => update({ description: event.target.value })} rows={8} value={description} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <DatePicker
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat={dateFormat}
                    label="Due date"
                    onChange={(date) => {
                      if (typeof date !== 'string' && date?.getTime && !isNaN(date.getTime())) {
                        update({ dueDate: date.toISOString().split("T")[0] });
                      } else if (date === null) {
                        update({ dueDate: undefined });
                      }
                    }}
                    // Otherwise, if undefined, it will default to today...
                    value={dueDate ? dueDate : null}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField fullWidth label="Priority" select value={priority} onChange={(event) => update({ priority: parseInt(event.target.value) as TTodoPriority })}>
                    <MenuItem value={TTodoPriority.NONE}>None</MenuItem>
                    <MenuItem value={TTodoPriority.LOW}>Low</MenuItem>
                    <MenuItem value={TTodoPriority.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={TTodoPriority.HIGH}>High</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <LabelsSelect onChange={(event) => update({ labels: event.target.value })} value={labels} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button onClick={remove}>Delete</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default memo(Todo);
