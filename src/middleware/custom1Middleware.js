export default ({getState, dispatch}) => {
  return next => action => {
    debugger;
    console.log('1 will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('1 state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return {
      type: 'tang1',
      payload: 'test',
    }
    // return null;
  }
}