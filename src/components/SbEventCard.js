import '../styles/EventCard.scoped.scss'

const SbEventCard = ({ children, event }) => {
  const teamOneMl = children.find(child => child.key === 'team-one-ml')
  const teamOneSpread = children.find(child => child.key === 'team-one-spread')

  const teamTwoMl = children.find(child => child.key === 'team-two-ml')
  const teamTwoSpread = children.find(child => child.key === 'team-two-spread')

  return (
    <div className="event-card">
      <div className="event-label">
        {event.eventLabel}
      </div>

      <table className="event-table">
        <tbody>
          <tr>
            <th>{event.teamOne.name}</th>
            <td>{teamOneMl}</td>
            <td>{teamOneSpread}</td>
          </tr>

          <tr>
            <th>{event.teamTwo.name}</th>
            <td>{teamTwoMl}</td>
            <td>{teamTwoSpread}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SbEventCard
