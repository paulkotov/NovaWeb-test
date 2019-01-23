export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case 'UPDATE_COMMENT':
      dispatch({ type:'FETCH_DATA' });
      break;
      
    default: 
      return next(action);
  }
  return next(action);
};