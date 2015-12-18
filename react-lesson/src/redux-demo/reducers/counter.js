export default function counter(state=1, action) {
  switch(action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMETN':
    return state - 1;
  default:
    return state;
  }
}