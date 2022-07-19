import '../styles/EventRow.scoped.scss'

const SbEventRow = ({ children, name }) => {
  return (
    <div className="events">
      <h3>{name}</h3>

      <div className="events-row">
        {children.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    </div>
  )
}

export default SbEventRow
