// @flow
import { ADD_ROUTES, BLOCK, UNBLOCK, SET_FROM } from '../types'
import { isServer, urlToAction, typeToScene } from '../utils'

import type {
  LocationState,
  RoutesMap,
  Action,
  History,
  Options
} from '../flow-types'

export default (routes: RoutesMap, history: History, options: Options) => {
  const initialState = createInitialState(routes, history, options)

  return (
    st: LocationState = initialState,
    action: Action
  ): LocationState => {
    const r = routes[action.type]
    const l = action.location

    if (r && r.path && !action.error &&
      (l.url !== st.url || l.kind === 'load' || action.info === 'reset')
    ) {
      const { type, params, query, state, hash, basename } = action
      const hasSSR = st.hasSSR
      return { type, params, query, state, hash, hasSSR, basename, ...l }
    }

    if (action.type === ADD_ROUTES) {
      const count = Object.keys(action.payload.routes).length  // we need to be able to update Links when new routes are added
      const routesAdded = (st.routesAdded || 0) + count        // we could just increment a number, but why not at least off some info
      return { ...st, routesAdded }
    }

    if (l && l.kind === 'setState') {
      const { state, location: { entries } } = action
      return { ...st, state, entries }
    }

    if (action.type.indexOf('_ERROR') > -1) {
      const { error, type: errorType } = action
      return { ...st, error, errorType }
    }

    if (action.type === BLOCK) {
      const { ref } = action.payload
      return { ...st, blocked: ref }
    }

    if (action.type === UNBLOCK) {
      const { blocked, ...state } = st
      return state
    }

    if (action.type === SET_FROM) {
      const { ref } = action.payload
      return { ...st, from: ref }
    }

    return st
  }
}

export const createInitialState = (
  routes: RoutesMap,
  history: History,
  options: Options
): LocationState => {
  const { kind, entries, index, length, location } = history
  const { url, pathname, search, basename } = location
  const action = urlToAction(location, routes, options)
  const { type, params = {}, query = {}, state = {}, hash = '' } = action
  const scene = typeToScene(type)
  const hasSSR = isServer()

  return {
    type,
    params,
    query,
    hash,
    state,

    url,
    pathname,
    search,
    basename: basename.substr(1),
    direction: 'forward',
    scene,

    kind: 'init',
    entries,
    index,
    length,

    hasSSR,

    prev: createPrev(hasSSR)
  }
}

export const createPrev = (hasSSR: boolean) => ({
  type: '',
  params: {},
  query: {},
  hash: '',
  state: {},

  url: '',
  pathname: '',
  search: '',
  basename: '',
  scene: '',
  direction: 'forward',

  kind: '',
  entries: [],
  index: -1,
  length: 0,

  hasSSR
})

// export const createPrevEntries = (entries, index, lastIndex, hasSSR: boolean, routes, opts) => {
//   const n = index > lastIndex ? -1 : 1
//   const direction = index > lastIndex ? 'forward' : 'backwawrd'
//   const kind = direction === 'forward' ? 'push' : 'back'
//   const entryAction = entries[n]
//   const url = actionToUrl(entry, routes, opts)
//   const { pathname, search, basename } = createLocation(url)
//   const scene = routes[entryAction.type].scene || ''

//   return {
//     ...entryAction,

//     url,
//     pathname,
//     search,
//     scene,
//     direction,

//     kind,
//     entries,
//     index: lastIndex,
//     length: entries.length,

//     hasSSR
//   }
// }