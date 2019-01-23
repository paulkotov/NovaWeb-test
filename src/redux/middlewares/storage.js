export default () => next => action => {
  switch (action.type) {
    case 'UPDATE_STORE':

      if (action.payload) {
        localStorage.setItem('projects', JSON.stringify(action.payload));
      }
      break;

    case 'CLEAR_STORE':
      localStorage.removeItem('projects');
      break;

    default:
      return next(action);
  }

  return next(action);
};
