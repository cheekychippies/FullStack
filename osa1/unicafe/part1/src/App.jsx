
import { useState } from 'react'

const Button = (props) => {
  const { onClick, text } = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}
//const Display = ({ counter }) => <div>All: {counter}</div>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ counter, rating }) => {
  const totalSum = rating.reduce((sum, value) => sum + value, 0)
  const average = counter > 0 ? totalSum / counter : 0
  const positive = rating.filter(value => value === 1).length
  const neutral = rating.filter(value => value === 0).length
  const bad = rating.filter(value => value === -1).length
  const persentage = counter > 0 ? positive / counter : 0


  if (counter > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={positive} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={counter} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine text="Persentage" value={`${persentage.toFixed(2)}%`} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No Feedback given</p>
  )

}


const App = () => {
  // tallenna napit omaan tilaansa
  //const [good, setGood] = useState(0)
  //const [neutral, setNeutral] = useState(0)
  //const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)
  const [rating, setRating] = useState([])

  const handleGoodClick = () => {
    //setGood(good + 1)
    setCounter(counter + 1)
    setRating(rating.concat(1))
  }
  const handleNeutralClick = () => {
    // setNeutral(neutral + 1)
    setCounter(counter + 1)
    setRating(rating.concat(0))
  }
  const handleBadClick = () => {
    //setBad(bad + 1)
    setCounter(counter + 1)
    setRating(rating.concat(-1))
  }
  // <Display counter={counter} />
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics counter={counter} rating={rating} />
    </div>
  )
}

export default App

