import React from 'react'

const ThrowErrorButton: React.FC = () => {
  const throwError = () => {
    throw new Error('This is a test error')
  }

  return <button onClick={throwError}>Throw Error</button>
}

export default ThrowErrorButton
