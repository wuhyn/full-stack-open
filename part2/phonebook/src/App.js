import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import Form from './components/Form'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  // Define state variables
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // Read and set data from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Display all persons, or filter if the search function is used
  const personsFiltered = search.length > 0 ? 
                    persons.filter(person => (
                        person.name.toLowerCase().includes(search.toLowerCase()) === true)
                        ) : persons

  // Add function
  // Checks if name exists in the phonebook, add it if it does not
  const addName = (event) => {
    // Prevent form from submitting
    event.preventDefault()

    let personExist = persons.find(element => element.name === newName)

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    // Add a new person in phonebook
    if(personExist === undefined) {
        personService
          .add(nameObject)
          .then(returnedPerson => {
            let text = `Added ${newName}`
            setMessage(text)
            setMessageType("info")
            setPersons(persons.concat(returnedPerson))
          })
    // Update a person in phonebook
    } else {
      let text = `${newName} is already added to the phonebook`
      let id = personExist.id

      if(window.confirm(text) === true) {
        text = "OK"
        personService
          .updateRecord(id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
      } else {
        text = "No"
      }
    }

    // Reset input boxes
    setNewName('')
    setNewNumber('')
  }

  // Delete function
  const handleDelete = (event) => {
    const nameToDeleteId = Number(event.target.value)
    const personsCollection = persons.filter(person => person.id !== nameToDeleteId)
    const personsDeleted = persons.filter(person => person.id === nameToDeleteId)

    personService
      .deleteRecord(nameToDeleteId)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        const message = "Information of " + personsDeleted[0].name + " has already been removed from the server";
        setMessage(message)
        setMessageType("error")
      })

    setPersons(personsCollection)

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
      <Notification message={message} messageType={messageType}/>
      {/* Search function for phonebook */}
      <Filter search={search} handleSearch={handleSearch}/>
      {/* Add new phonebook entries */}
      <h2>Add new</h2>
      <Form addName={addName} handleNameChange={handleNameChange} newName={newName} 
            handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      {/* Display phonebook information */}
      <h2>Numbers</h2>
      <Person persons={personsFiltered} handleDelete={handleDelete}/>
    </div>
  )
}

export default App