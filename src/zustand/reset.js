import create, { GetState, SetState, State, StateCreator, StoreApi, UseBoundStore } from 'zustand';

const zustandResetters = [];

export const createResettableSlice = (
  name,
  createState,
) => {
  if (zustandResetters.find((resetter) => resetter.name === name)) {
    throw Error(`A slice with name '${name}' already exists`);
  }

  const slice = create(createState);
  const initialState = slice.getState();
  const resetter = {
    name,
    resetCallback: () => {
      slice.setState(initialState, true);
    },
  };
  zustandResetters.push(resetter);

  return slice;
};

export const resetSlice = (name) => {
  zustandResetters.find((resetter) => resetter.name === name)?.resetCallback();
};

export const resetAllSlices = () => {
  for (const { resetCallback } of zustandResetters) {
    resetCallback();
  }
};
