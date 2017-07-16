import React from 'react'
import { withReducer } from 'recompose'

const Welcome = props => {
  return (
    <div className="flex sans-serif items-around justify-center bg-washed-yellow">
      <div className="mv4 tc">
        <img alt="logo" className="h-25" src="/pixel-fun.png" />
        <h1 className="orange">Pixel Fun Gallery</h1>
        <form onSubmit={handleSubmit(props.history, props.query)}>
          <input
            value={props.query}
            onChange={e =>
              props.dispatch({ type: 'SET_QUERY', payload: e.target.value })}
            type="text"
            className="input-reset ba br1 pa2 w-50"
            placeholder="search by name or author"
          />
        </form>
      </div>
    </div>
  )
}

const enhance = withReducer('query', 'dispatch', queryReducer)

export default enhance(Welcome)

function handleSubmit(history, query) {
  return e => {
    e.preventDefault()
    history.push('/search?query=' + query)
  }
}

function queryReducer(state = '', action) {
  switch (action.type) {
    case 'SET_QUERY':
      return action.payload
    default:
      return state
  }
}
