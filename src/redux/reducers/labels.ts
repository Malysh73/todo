import { createDraftSafeSelector, createEntityAdapter, createSlice, EntityId } from "@reduxjs/toolkit";

import { Label } from "../../types";
import { labelsInitialState } from "../initialState";
import { TState } from "../store";

const labelsAdapter = createEntityAdapter<Label>({
  sortComparer: (a, b) => a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase()),
});

const emptyInitialState = labelsAdapter.getInitialState();
const filledState = labelsAdapter.upsertMany(emptyInitialState, labelsInitialState);

export const { reducer: labelsReducer } = createSlice({
  name: "labels",
  initialState: filledState,
  reducers:{}
});

const defaultSelectors = labelsAdapter.getSelectors((state: TState) => state.labels);

const selectByIds = createDraftSafeSelector([defaultSelectors.selectEntities, defaultSelectors.selectIds, (state: any, ids: EntityId[]) => ids], (entities, idsOrder, idsToPick) => {
  return idsOrder.reduce((acc, val) => {
    if (idsToPick.includes(val)) acc.push(entities[val] as Label);

    return acc;
  }, [] as Label[]);
});

export const labelsSelectors = { ...defaultSelectors, selectByIds };
