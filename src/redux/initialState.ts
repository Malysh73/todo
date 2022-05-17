import { Label, Todo, TTodoPriority } from "../types";

export const labelsInitialState: Label[] = [{ ...new Label({ id: "oYS6jCV-9_r6-gApwP-a0", title: "Work" }) }, { ...new Label({ id: "6upNOC-XWS_LKn0Cdcgc_", title: "Leisure" }) }, { ...new Label({ id: "HrlBY9eBGad8ShNV5XWry", title: "Personal" }) }];

export const todosInitialState: Todo[] = [
  { ...new Todo({ title: "Have some fun" }) },
  { ...new Todo({ title: "Workout!", priority: TTodoPriority.MEDIUM, labels: [labelsInitialState[2].id] }) },
  { ...new Todo({ description: "Hello!", title: "Publish this on GitHub", completionDate: "2022-05-017T12:28:39.266Z" }) },
];
