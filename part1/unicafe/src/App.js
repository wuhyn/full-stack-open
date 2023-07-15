import { useState } from 'react'

// Define components
const Heading = ({text}) => <h1>{text}</h1>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const Stat = ({name, count}) => <p>{name} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodValue = count => {
    setGood(good + count)
  }

  const addNeutralValue = count => {
    setNeutral(neutral + count)
  }

  const addBadValue = count => {
    setBad(bad + count)
  }

  return (
    <div>
      <Heading text="Give feedback"/>
      <Button name="good" handleClick={() => addGoodValue(1)}/>
      <Button name="neutral" handleClick={() => addNeutralValue(1)}/>
      <Button name="bad" handleClick={() => addBadValue(1)}/>
      <Heading text="Statistics"/>
      <Stat name="good" count={good}/>
      <Stat name="neutral" count={neutral}/>
      <Stat name="bad" count={bad}/>
    </div>
  )
}

export default App