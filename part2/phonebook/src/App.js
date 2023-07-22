import { useState } from 'react'

const App = () => {
  // Define defauly persons object
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '04-1234567' 
    }
  ]) 

  // Define state variables
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // Display all persons, or filter if the search function is used
  const phonebook = search.length > 0 ? 
                    persons.filter(person => (
                        person.name.toLowerCase().includes(search.toLowerCase()) === true)
                        ) : persons

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

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
       filter shown with <input value={search} onChange={handleSearch}/>
      <h2>Add new</h2>
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
      {phonebook.map(person => {
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