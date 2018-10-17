import React, { Component } from 'react'
import * as Rudy from '@respond-framework/rudy'
import { connect } from 'react-redux'

const { actions, routes } = Rudy.createScene(
  {
    OVERVIEW: {
      path: 'overview/',
      thunk: () => console.log('thunk'),
    },
  },
  { scene: 'DASHBOARD' },
)

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log('Routes:', routes)
    console.log('Actions:', actions)
    props.dispatch(actions.overview({ foo: 'bar' }))
  }

  render() {
    return <h1>main dashboard template</h1>
  }
}

export default connect()(Dashboard)
