import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './components/Search'
import Results from './components/Results'
import ThrowErrorButton from './components/ThrowErrorButton'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import useSearchQuery from './hooks/useSearchQuery'

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchQuery()

  return (
    <Router>
      <ErrorBoundary>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
          <div
            style={{
              flex: '1 0 auto',
              padding: '1rem',
              backgroundColor: '#f1f1f1',
            }}
          >
            <Search onSearch={setSearchTerm} />
            <ThrowErrorButton />
          </div>
          <div style={{ flex: '3 1 auto', padding: '1rem', overflowY: 'auto' }}>
            <Switch>
              <Route exact path="/">
                <Results searchTerm={searchTerm} />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
