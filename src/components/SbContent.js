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
          },
          buttons: [
            {
              key: 'team-one-ml',
              betKeys: {
                eventId,
                teamId: teamOne.id,
                betId: teamOneBets[0].id
              },
              lineage: teamOneBets[0].lineage
            },
            {
              key: 'team-one-spread',
              betKeys: {
                eventId,
                teamId: teamOne.id,
                betId: teamOneBets[1].id
              },
              lineage: teamOneBets[1].lineage
            },
            {
              key: 'team-two-ml',
              betKeys: {
                eventId,
                teamId: teamTwo.id,
                betId: teamTwoBets[0].id
              },
              lineage: teamTwoBets[0].lineage
            },
            {
              key: 'team-two-spread',
              betKeys: {
                eventId,
                teamId: teamTwo.id,
                betId: teamTwoBets[1].id
              },
              lineage: teamTwoBets[1].lineage
            }
          ]
        }
      })
    }))

    setRows(rowsData)
  }, [data.sports])

  const handleClick = ({ eventId, betId, teamId }) => {
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
              {event.buttons.map(button => (
                <SbButton
                  key={button.key}
                  onClick={() => handleClick(button.betKeys)}>
                  {button.lineage}
                </SbButton>
              ))}
            </SbEventCard>
          ))}
        </SbEventRow>
      ))}
    </main>
  )
}

export default SbContent
