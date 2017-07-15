import React from 'react'
import R from 'ramda'

const { map } = R

const Art = props => {
  console.log(props)
  const drawCell = cell => {
    return (
      <div key={`${cell.row}:${cell.col}`} className={`fl w2 h2 bg-${cell.color}`}></div>
    )
  }
  const drawRows = cols => {
    return (
      <div key={cols[0].row} className="cf">
        { map(drawCell, cols) }
      </div>
    )
  }
  return (
    <div>
      { map(drawRows, props.board || []) }
    </div>
  )
}

export default Art