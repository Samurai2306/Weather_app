function CitySelector({ cities, selectedCity, onCityChange, searchQuery, onSearchChange }) {
  const filteredCities = searchQuery
    ? cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : cities

  return (
    <div className="city-selector">
      <div className="city-search">
        <input
          type="text"
          placeholder="Поиск города..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="city-grid">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => {
            const isActive = city.name === selectedCity.name
            const isHighlighted = city.highlighted
            return (
              <button
                key={city.name}
                className={`city-chip ${isActive ? 'active' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                onClick={() => onCityChange(city)}
              >
                <span>{city.name}</span>
                <small>{city.query}</small>
              </button>
            )
          })
        ) : (
          <p className="no-results">Город не найден</p>
        )}
      </div>
    </div>
  )
}

export default CitySelector
