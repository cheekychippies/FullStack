const Filter = ({ filterName, handleFilterChange }) => {
    return (
        <div>
            Filter <input value={filterName}
                onChange={handleFilterChange} />
        </div>
    )
}

export default Filter