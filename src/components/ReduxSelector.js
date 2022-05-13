import React, {useEffect, useState, useMemo} from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit'

import countSelector from '../selector/countSelector'
import todoSelector from '../selector/todoSelector'

// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
// } from './counterSlice';
import styles from './Counter.module.css';

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps')
  return {
    todos: todoSelector.getTodos(state),
    count: countSelector.getCount(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}

// TODO Cách này thì vẫn nhìn ok nhất, createSelector có thể lấy từ reslect nếu như ko dùng redux-toolkit
const customSelector = createSelector(
  [
    (state) => {
      return todoSelector.getTodos(state);
    },
    (state) => {
      return countSelector.getCount(state);
    },
    (state, x) => {
      return x;
    }
  ],
  (todos, count, x) => {
    return {
      sum: todos.length + count + x,
      payload: 'nhatpa',
    };
  }
)

// TODO Cách này thì vẫn ok nhưng ko tối ưu bằng cách trên, do việc render lại phụ thuộc vào các selector (countSelector.getCount, todoSelector.getTodos) dùng trong deps của memo,
//  còn ví dụ trên là chỉ render lại khi kết quả của customSelector thay đổi.
const useSelectorValue = (x) => {
  const count = useSelector(countSelector.getCount);
  const todos = useSelector(todoSelector.getTodos);
  return useMemo(() => {
    return {
      sum: todos.length + count + x,
      payload: 'nhatpa',
    };
  }, [count, todos, x])
}

function Counter(props) {
  const count = useSelector(countSelector.getCount);
  const todos = useSelector(todoSelector.getTodos);

  const dispatch = useDispatch();

  // const {
  //   count,
  //   todos
  // } = props;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch({
              type: 'giam1',
              payload: {
                x: 11,
                y: 22,
              },
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
              type: 'tang1-va-giu-nguyen',
            });
          }}
        >
          +
        </button>
      </div>
      <ul>
        {
          todos.map(todo => <li>{todo.text}</li>)
        }
      </ul>
    </div>
  );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
export default Counter
