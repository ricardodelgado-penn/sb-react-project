import { useEffect, useState } from "react"
import { useStore } from "../store"
import SbEventRow from './SbEventRow'
import SbEventCard from './SbEventCard'
import SbButton from "./SbButton"

const SbContent = () => {
  const { data, submitBet } = useStore((state) => ({
    data: state.data,
    submitBet: state.submitBet
  }))
  const [ rows, setRows ] = useState([])

  const capitalize = word => {
    const newWord = word.split('')
    newWord[0] = word[0].toUpperCase()

    return newWord.join('')
  }

  useEffect(() => {
    const rowsData = data.sports.map(sport => ({
      name: sport.name,
      key: sport.key,
      events: sport.eventIds.map(eventId => {
        const event = data.events.find(event => event.id === eventId)

        const [ teamOneData, teamTwoData ] = event.participants
        
        const teamOne = data.teams.find(team => team.id === teamOneData.id)
        const teamTwo = data.teams.find(team => team.id === teamTwoData.id)

        const teamOneBets = teamOneData.betIds.map(betId => data.bets.find(bet => bet.id === betId))
        const teamTwoBets = teamTwoData.betIds.map(betId => data.bets.find(bet => bet.id === betId))

        return {
          eventId: eventId,
          eventLabel: `${capitalize(teamOne.name)} vs ${capitalize(teamTwo.name)}`,
          teamOne: {
            ...teamOne,
            name: capitalize(teamOne.name),
            bets: teamOneBets,
          },
          teamTwo: {
            ...teamTwo,
            name: capitalize(teamTwo.name),
            bets: teamTwoBets,
          }
        }
      })
    }))

    setRows(rowsData)
  }, [data.sports])

  const handleClick = (eventId, betId, teamId) => {
    submitBet({
      eventId,
      betId,
      teamId
    })
  }

  return (
    <main className="content">
      {rows.map(sport => (
        <SbEventRow key={sport.key} name={sport.key.toUpperCase()}>
          {sport.events.map(event => (
            <SbEventCard key={event.eventId} event={event}>
              <SbButton
                key="team-one-ml"
                onClick={() => handleClick(event.eventId, event.teamOne.bets[0].id, event.teamOne.id)}>
                {event.teamOne.bets[0].lineage}
              </SbButton>

              <SbButton
                key="team-one-spread"
                onClick={() => handleClick(event.eventId, event.teamOne.bets[1].id, event.teamOne.id)}>
                  {event.teamOne.bets[1].lineage}
              </SbButton>

              <SbButton
                key="team-two-ml"
                onClick={() => handleClick(event.eventId, event.teamTwo.bets[0].id, event.teamTwo.id)}>
                {event.teamTwo.bets[0].lineage}
              </SbButton>

              <SbButton
                key="team-two-spread"
                onClick={() => handleClick(event.eventId, event.teamTwo.bets[1].id, event.teamTwo.id)}>
                {event.teamTwo.bets[1].lineage}
              </SbButton>
            </SbEventCard>
          ))}
        </SbEventRow>
      ))}
    </main>
  )
}

export default SbContent
