import React from 'react'
import R from 'ramda'
import recompose, { lifecycle, withReducer } from 'recompose'
import db from '../db'

import { Link, Redirect } from 'react-router-dom'

const {compose, split, head, tail, pluck, map } = R
const parse = compose(
  head,
  tail,
  split('='),
  head,
  split('&'),
  head,
  tail,
  split('?')
)

const Search = props => {
  console.log(props)
  const li = doc => 
    <li key={doc._id}>
      <Link to={`/${doc.name.split(' ').join('-')}/${doc._id}`}>{doc.name} by {doc.author}</Link>
    </li>
  
  return (
    <div className="flex justify-center">
      <div>
        {props.results.length === 1 && <Redirect to={`${props.results[0].name}/${props.results[0]._id}`} />}
        <h1>Search Results</h1>
        {props.results.length === 0 && <p>No Results</p>}
        <ul className="list">
          {map(li, props.results)}
        </ul>
        <Link to="/">New Search</Link>
      </div>
    </div>
  )
}

const enhance = recompose.compose(
  withReducer('results', 'dispatch', reducer),  
  lifecycle({
    componentDidMount () {
      const query = parse(this.props.location.search)
      db.query('search', { limit: 10, start_key: query, end_key: query + '{}' })
        .then(res => this.props.dispatch({type: 'SET_RESULTS', payload: pluck('value', res.rows)}))

    }
  })
)

export default enhance(Search)

function reducer (state=[], action) {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload
    default:
      return state
  }
}
