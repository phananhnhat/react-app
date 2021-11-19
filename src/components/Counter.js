import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
// } from './counterSlice';
import styles from './Counter.module.css';

const selectCount = (state) => state.counter.value;

export function Counter() {
  const count = useSelector(selectCount);
  console.log('count', count)
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch((dispatch1) => {
              dispatch1({
                type: 'giam1',
                payload: 'test',
              })
            });
          }}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            dispatch({
              type: 'tang1',
              payload: 'test',
            });
          }}
        >
          +
        </button>
      </div>
      {/*<div className={styles.row}>*/}
      {/*  <input*/}
      {/*    className={styles.textbox}*/}
      {/*    aria-label="Set increment amount"*/}
      {/*    value={incrementAmount}*/}
      {/*    onChange={(e) => setIncrementAmount(e.target.value)}*/}
      {/*  />*/}
      {/*  <button*/}
      {/*    className={styles.button}*/}
      {/*    onClick={() => dispatch(incrementByAmount(incrementValue))}*/}
      {/*  >*/}
      {/*    Add Amount*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className={styles.asyncButton}*/}
      {/*    onClick={() => dispatch(incrementAsync(incrementValue))}*/}
      {/*  >*/}
      {/*    Add Async*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className={styles.button}*/}
      {/*    onClick={() => dispatch(incrementIfOdd(incrementValue))}*/}
      {/*  >*/}
      {/*    Add If Odd*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}
