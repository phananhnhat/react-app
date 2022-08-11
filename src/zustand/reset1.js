import actualCreate, { GetState, SetState, State, StateCreator, StoreApi, UseBoundStore } from 'zustand';

const resetters = [];

export const create = (createState)=> {
  const slice = actualCreate(createState);
  const initialState = slice.getState();

  resetters.push(() => {
    slice.setState(initialState, true);
  });

  return slice;
};

export const resetAllSlices = () => {
  for (const resetter of resetters) {
    resetter();
  }
};
