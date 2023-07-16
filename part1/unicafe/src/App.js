import { useState } from 'react'

// Define components
const Heading = ({text}) => <h1>{text}</h1>

const Buttons = (props) => {
  return (
    <>
      <Button name="good" handleClick={props.addGood}/>
      <Button name="neutral" handleClick={props.addNeutral}/>
      <Button name="bad" handleClick={props.addBad}/>
    </>
  )
}

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        {text === 'positive' ? <td>{value} %</td> : <td>{value}</td>}
      </tr>
    </>
  )
}

const Statistics = ({stats}) => {
  return (
    <>
      {stats[0] !== 0 || stats[1] !== 0 || stats[2] !== 0 ?
      <table>
        <tbody>
        <StatisticLine text="good" value ={stats[0]} />
        <StatisticLine text="neutral" value ={stats[1]} />
        <StatisticLine text="bad" value={stats[2]} />
        <StatisticLine text="all" value={stats[3]}/>
        <StatisticLine text="average" value={stats[4]}/>
        <StatisticLine text="positive" value={stats[5]}/>
        </tbody>
      </table>
      : <p>No feedback given</p>}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // State setter function to update state variables
  const addGoodValue = () => {
    setGood(good + 1)
  }

  const addNeutralValue = () => {
    setNeutral(neutral + 1)
  }

  const addBadValue = () => {
    setBad(bad + 1)
  }

  // Calculation of state variables
  let count = good + bad + neutral
  let average = (good + (bad * -1))/count
  let positive = good/count

  const statArray = [good, neutral, bad, count, average, positive]

  return (
    <div>
      <Heading text="Give feedback"/>
      <Buttons addGood={addGoodValue} addNeutral={addNeutralValue} addBad={addBadValue}/>
      <Heading text="Statistics"/>
      <Statistics stats={statArray}/>
    </div>
  )
}

export default App