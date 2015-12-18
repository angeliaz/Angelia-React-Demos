import {createStore} from 'redux'
import reducer from './reducers/index';

let store = createStore(reducer);
// store.subscribe(() => console.log('dispatch'));





function select(state) {
  return state.some.deep.property;
}

let currentValue;
function handleChange() {
  let previousValue = currentValue;
  currentValue = select(store.getState());

  if (previousValue !== currentValue) {
    console.log('Some deep nested property changed from', previousValue, 'to', currentValue);
  }
}

let unsubscribe = store.subscribe(handleChange);
handleChange();


store.dispatch({type: 'ADD', data: {text: 'test', name: '1'} });
store.dispatch({type: 'ADD', data: {text: 'test1', name: '2'} });
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});

console.log(store.getState());