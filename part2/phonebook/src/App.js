import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // Add name function
  const addName = (event) => {
    // Prevent form from submitting
    event.preventDefault()

    // Check if name exists in the phonebook, add it if it does not
    let personExist = persons.find(element => element.name === newName)

    if(personExist === undefined) {
        const nameObject = {
            name: newName
        }
    
        setPersons(persons.concat(nameObject))
    } else {
        alert(`${newName} is already added to the phonebook`)
    }

    setNewName('')
  }

  // Handle name change function to set state onew newName based on user input
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
  )
}

export default App