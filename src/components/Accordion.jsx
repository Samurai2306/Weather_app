import { useState } from 'react'

function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="accordion-title">
          <span>{title}</span>
        </div>
        <span className="accordion-arrow">{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}

export default Accordion

