export default (state = 'HOME', action = {}) => {
  console.log(action)
  return components[action.type] || state
}

const components = {
  HOME: 'Home',
  LIST: 'List',
  NOT_FOUND: 'NotFound',
  DASHBOARD: 'Dashboard',
  'DASHBOARD/OVERVIEW': 'Dashboard/Overview', // ideally, we could use scene and if we pass it an array of scenes to create with this route, then we could map DASHBOARD into the key DASHBOARD. Like converting a path to an object location? issue is when things are not relative, unless we duplicate it. just an idea
}

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router's <Route /> component.
//
// ALSO:  Forget a switch, use a hash table for perf.
