import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Form from './components/Form'

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
      {/* Search function for phonebook */}
      <Filter search={search} handleSearch={handleSearch}/>
      {/* Add new phonebook entries */}
      <h2>Add new</h2>
      <Form addName={addName} handleNameChange={handleNameChange} newName={newName} 
            handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      {/* Display phonebook information */}
      <h2>Numbers</h2>
      <Persons phonebook={phonebook}/>
    </div>
  )
}

export default App