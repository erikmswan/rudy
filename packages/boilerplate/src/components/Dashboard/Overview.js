import React from 'react'
import * as Rudy from '@respond-framework/rudy'

const { actions, routes } = Rudy.createScene(
  {
    OVERVIEW: {
      path: '/fourth/:foo?',
      thunk: () => console.log('thunk'),
    },
  },
  { scene: 'DASHBOARD/OVERVIEW' },
)

const Dashboard = () => <h1>This is a nested Route!</h1>

export default Dashboard
