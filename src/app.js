import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Welcome from './pages/welcome'
import Show from './pages/show'
import Search from './pages/search'

const App = props => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path='/search' component={Search} />
          <Route path="/:slug/:id" component={Show} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App