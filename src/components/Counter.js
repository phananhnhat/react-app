import React, {useEffect, useState} from 'react';
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

export function Counter({test, test1}) {
  const count = useSelector(selectCount);

  useEffect(() => {
      console.log('test', test)
    }, [],
  )

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
          // Thunk
          // onClick={() => {
          //   dispatch((dispatch1) => {
          //     dispatch1({
          //       type: 'giam1',
          //       payload: {
          //         x: 1,
          //         y: 2,
          //       },
          //     })
          //   });
          // }}
          onClick={() => {
            dispatch({
              type: 'forkTest',
              payload: {
                x: 11,
                y: 22,
              },
            });
          }}
        >
          -
        </button>
        <button
          style={{
            backgroundColor: 'red',
          }}
          class="123"
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch({
              type: 'callGeneratorFnTest',
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
              // type: 'tang1-va-giu-nguyen',
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
