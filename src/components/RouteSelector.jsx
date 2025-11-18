function RouteSelector({ routes, selectedRoute, onRouteSelect }) {
  return (
    <div className="route-selector">
      <p className="route-hint">Выберите маршрут, чтобы увидеть погоду по пути к вузу</p>
      <div className="route-buttons">
        {routes.map((route) => (
          <button
            key={route.id}
            className={`route-button ${selectedRoute?.id === route.id ? 'active' : ''}`}
            onClick={() => onRouteSelect(route)}
          >
            <span className="route-icon">{route.icon}</span>
            <div className="route-info">
              <strong>{route.name}</strong>
              <small>{route.description}</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RouteSelector

