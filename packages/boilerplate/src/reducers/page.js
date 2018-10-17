export default (state = 'HOME', action = {}) => {
  console.log(action)
  return components[action.type] || state
}

const components = {
  HOME: 'Home',
  LIST: 'List',
  NOT_FOUND: 'NotFound',
  'list/FOURTH': 'Item',
}

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router's <Route /> component.
//
// ALSO:  Forget a switch, use a hash table for perf.
