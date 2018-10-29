// @flow
// TODO: Assess and add better flow annotations
export default (name: string, selector: ?string | ?Function): any => {
  if (typeof selector === 'function') {
    return selector
  }
  if (selector) {
    return (state: Object): any => (state ? state[selector] : undefined)
  }
  return (state: Object): any => (state ? state[name] : undefined)
}
