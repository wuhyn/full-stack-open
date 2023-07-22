const Filter = ({search, handleSearch}) => {
    return (
        <>
            filter shown with <input value={search} onChange={handleSearch}/>
        </>
        
    )
}

export default Filter