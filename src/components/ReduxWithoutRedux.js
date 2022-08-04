import React, { Component } from 'react';

let globalState = {
  value: 0,
}

const dispatch = (action) => {
  const newState = counter(globalState, action);
  globalState = newState;
}

// Reducer
const counter = (state = globalState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const mapStateToProps = (Component) => {
  return () => {
    return (
      <Component />
    )
  }
}

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state({
      counter: counter(undefined, {}),
    });
  }

  dispatch(action) {
    const newState = counter(this.state, action);
    this.setState({
      counter: newState,
    });
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <div>
        {this.state.counter.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
