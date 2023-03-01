import React from 'react'
import ReactDOM from 'react-dom/client'
import { Counter } from 'react-pretty-counter'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const colors = ['#249D02', '#F35B04']

root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
      <Counter color={colors[0]} />
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value</h2>
      <Counter color={colors[1]} value={5} />
    </div>
  </React.StrictMode>,
)
