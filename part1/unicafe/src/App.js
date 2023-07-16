import { useState } from 'react'

// Define components
const Heading = ({text}) => <h1>{text}</h1>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const Statistics = ({name, count}) => name === 'positive' ? <p>{name} {count} %</p> : <p>{name} {count} </p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // State setter function to update state variables
  const addGoodValue = count => {
    setGood(good + count)
  }

  const addNeutralValue = count => {
    setNeutral(neutral + count)
  }

  const addBadValue = count => {
    setBad(bad + count)
  }

  // Calculation of state variables
  let count = good + bad + neutral
  let average = (good + (bad * -1))/count
  let positive = good/count

  return (
    <div>
      <Heading text="Give feedback"/>
      <Button name="good" handleClick={() => addGoodValue(1)}/>
      <Button name="neutral" handleClick={() => addNeutralValue(1)}/>
      <Button name="bad" handleClick={() => addBadValue(1)}/>
      <Heading text="Statistics"/>
      { good !== 0 || neutral !== 0 || bad !== 0 ?
        <>
          <Statistics name="good" count={good}/>
          <Statistics name="neutral" count={neutral}/>
          <Statistics name="bad" count={bad}/>
          <Statistics name="all" count={count}/>
          <Statistics name="average" count={average}/>
          <Statistics name="positive" count={positive}/>
        </>
        : <p>No feedback given</p>
      }
      
    </div>
  )
}

export default App