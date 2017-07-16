import React from 'react'
import R from 'ramda'

const { map } = R

const Art = props => {
  const drawCell = cell => {
    return (
      <div
        key={`${cell.row}:${cell.col}`}
        className={`fl w1 h1 w2-ns h2-ns bg-${cell.color}`}
      />
    )
  }
  const drawRows = cols => {
    return (
      <div key={cols[0].row} className="cf">
        {map(drawCell, cols)}
      </div>
    )
  }
  return (
    <div>
      {map(drawRows, props.board || [])}
    </div>
  )
}

export default Art
