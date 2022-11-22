import create from 'zustand';
import {persist} from 'zustand/middleware';

// export const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({bears: state.bears + 1})),
//   removeAllBears: () => set({bears: 0}),
// }));

export const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({bears: state.bears + 1})),
      removeAllBears: () => set({bears: 0}),
    }),
    {
      name: 'food-storage', // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
      // partialize: (state) =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(([key]) => !['foo'].includes(key))
      //   ),
      onRehydrateStorage: (state) => {
        console.log('hydration starts')
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('hydration finished')
          }
        }
      },
      version: 0,
      // migrate: (persistedState, version) => {
      //   if (version === 0) {
      //     // if the stored value is in version 0, we rename the field to the new name
      //     persistedState.newField = persistedState.oldField
      //     delete persistedState.oldField
      //   }
      //
      //   return persistedState
      // },
      // merge: (persistedState, currentState) =>
      //   deepMerge(currentState, persistedState),
    }
  )
);

// interface Storage {
//   getItem: (name: string) => string | null | Promise<string | null>
//   setItem: (name: string, value: string) => void | Promise<void>
//   removeItem: (name: string) => void | Promise<void>
// }

export const useFishStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({fishes: get().fishes + 1}),
    }),
    {
      name: 'food-storage', // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
      // partialize: (state) =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(([key]) => !['foo'].includes(key))
      //   ),
      onRehydrateStorage: (state) => {
        console.log('hydration starts')
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('hydration finished')
          }
        }
      },
      version: 0,
    }
  )
);


