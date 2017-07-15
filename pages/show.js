import React from 'react'
import db from '../db'
import { lifecycle, withReducer, compose } from 'recompose'
import Art from '../components/art'
import { Link } from 'react-router-dom'

const Show = props => {
  return (
    <div>
      <header className="pa2 bg-light-gray mb4 flex justify-around">
        <h3 className="tc sans-serif black-80">
          <span className="ba br2 pa2 bg-orange white dim">About</span>
        </h3>
        <h3 className="tc sans-serif black-80">
          <Link to="/" className="link ba br2 pa2 bg-orange white dim">Search</Link>
        </h3>
        <h3 className="tc sans-serif black-80">
          <a className="twitter-share-button link ba br2 pa2 bg-orange white dim"
            href={`https://twitter.com/intent/tweet?text=Check out this art! 
At Pixel Fun https://pixelfun.xyz/art/${props.match.params.id}
 Create your own art at https://app.pixelfun.xyz `}
            data-size="large">
          Tweet</a>
        </h3>
      </header>
      <div className="flex items-center justify-center">
        { props.doc && <Art board={props.doc.board} /> }  
      </div>
    </div>
  )
}

const enhance = compose(
  withReducer('doc', 'dispatch', docReducer),
  lifecycle({
    componentDidMount() {
      db.get(this.props.match.params.id)
        .then(doc => {
          this.props.dispatch({
            type: 'SET_DOC',
            payload: doc
          })
        })

    }
  })
)

export default enhance(Show)

function docReducer (state={}, action) {
  switch (action.type) {
    case 'SET_DOC':
      return action.payload
    default:
      return state
  }
}