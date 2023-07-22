import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '04-1234567' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Add name function
  // Checks if name exists in the phonebook, add it if it does not
  const addName = (event) => {
    // Prevent form from submitting
    event.preventDefault()

    let personExist = persons.find(element => element.name === newName)

    if(personExist === undefined) {
        const nameObject = {
            name: newName,
            number: newNumber,
        }
    
        setPersons(persons.concat(nameObject))
    } else {
        alert(`${newName} is already added to the phonebook`)
    }

    // Reset input boxes
    setNewName('')
    setNewNumber('')
  }

  // Handle name change function to set state onew newName based on user input
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
            <>
                <p>{person.name} {person.number}</p>
            </>
            )
      })}
    </div>
  )
}

export default App