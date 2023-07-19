import { useState } from 'react'

const Anecdote = ({title, text}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
    </>
  )
}

const Vote = ({vote}) => { 
  return (
    <p>has {vote} votes</p>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const App = () => {
  // Define state variables
  const [selected, setSelected] = useState(0)
  const [randomNumber, setRandomNumber] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [topVote, setTopVote] = useState(0)
  const [topVoteIndex, setTopVoteIndex] = useState(0)

  const handleClickRandom = () => {
    // Generate random number
    const random = Math.floor(Math.random() * anecdotes.length)
    // Set random state variable
    setRandomNumber(random)
    // Set a quote by using the random state number
    setSelected(random)
  }

  const handleClickVote = () => {
    // Create copy of array
    const votesCopy = [...votes]
    // Increment vote
    votesCopy[randomNumber] += 1
    // Update state with the copy of the array
    setVotes(votesCopy)
    // Get the vote with the highest number
    getHighestVote()
  }

  const getHighestVote = () => {
    // Loop through each vote in the array and get the max
    votes.forEach((element, index) => {
      // console.log("Element ", element)
      if(element > topVote){
        setTopVote(element)
        setTopVoteIndex(index)
      }
    })
  }

  return (
    <div>
      {/* {anecdotes[selected]} */}
      <Anecdote title={"Anecdote of the day"} text={anecdotes[selected]}/>
      <Vote vote={votes[randomNumber]}/>
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickRandom}>Next anecdote</button>
      <Anecdote title={"Anecdote with most votes"} text={anecdotes[topVoteIndex]}/>
      <Vote vote={votes[topVoteIndex]}/>
    </div>
  )
}

export default App