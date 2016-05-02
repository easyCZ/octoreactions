import { combineReducers } from 'redux';


export function reactions(state={}, action) {

  switch (action.type) {

    case 'TEST2':
      return {test: 'TEST2'};

  }

  return state;

}
