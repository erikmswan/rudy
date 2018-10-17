import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import * as Rudy from '@respond-framework/rudy'
// import { Link } from '@respond-framework/link'

import ArticlePromotion from './ArticlePromotion'

import styles from '../css/List'

const { actions, routes } = Rudy.createScene(
  {
    FOURTH: {
      path: '/fourth/:foo?',
      thunk: () => console.log('thunk'),
    },
  },
  { scene: 'list' },
)

class List extends Component {
  constructor(props) {
    super(props)
    this.state = { lol: 1 } // eslint-disable-line
    console.log('Routes:', routes)
    console.log('Actions:', actions)
    props.dispatch(actions.fourth({ foo: 'bar' }))
  }

  render() {
    const { category, packages } = this.props
    return (
      <div className={styles.list}>
        <div className={styles.title}>
          Category:
          {category}
        </div>

        <div className={styles.content}>
          <ul>
            {packages.map((pkg) => (
              <li key={pkg}>{pkg}</li>
            ))}
          </ul>

          {category === 'redux' ? (
            <ArticlePromotion
              title="Wanna master data-fetching? Read:"
              text="Redux-First Router data-fetching: solving the 80% use case for async Middleware 🚀"
              url="https://medium.com/faceyspacey/redux-first-router-data-fetching-solving-the-80-use-case-for-async-middleware-14529606c262"
            />
          ) : (
            <ArticlePromotion
              title="New to Rudy?? Learn how it started and its motivation:"
              text="Pre Release: Redux-First Router — A Step Beyond Redux-Little-Router 🚀"
              url="https://medium.com/faceyspacey/pre-release-redux-first-router-a-step-beyond-redux-little-router-cd2716576aea"
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  category: state.category,
  packages: state.packages,
})

export default hot(module)(connect(mapStateToProps)(List))
