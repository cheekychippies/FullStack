
import { useState } from 'react'

const Button = (props) => {
  const { onClick, text } = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Display = ({ counter }) => <div>All: {counter}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setCounter(counter + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setCounter(counter + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setCounter(counter + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <Display counter={counter} />

    </div>
  )
}

export default App

