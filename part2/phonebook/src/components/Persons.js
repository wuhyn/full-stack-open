const Persons = ({phonebook}) => {
    return phonebook.map(person => <p>{person.name} {person.number}</p>)
}

export default Persons