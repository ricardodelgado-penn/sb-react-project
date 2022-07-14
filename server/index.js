const fs = require('fs')
const express = require('express')
const app = express()
const port = 3008

const { faker } = require('@faker-js/faker')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let rawdata = fs.readFileSync('data.json')
const allData = JSON.parse(rawdata)

const allSports = [
  {
    name: 'Major League Baseball',
    key: 'mlb'
  },
  {
    name: 'National Football League',
    key: 'nfl'
  },
  {
    name: 'National Basketball Association',
    key: 'nba'
  },
  {
    name: 'National Hockey League',
    key: 'nhl'
  }
]

app.get('/all-sports', (req, res) => {
  res.send(allSports)
})

app.get('/events', (req, res) => {
  const events = allData.flatMap(sport => {
   return sport.events.map(event => ({
    id: event.id,
    participants: event.participants.map(participant => ({
      id: participant.id,
      betIds: participant.bets.map(bet => bet.id)
    }))
   }))
  })

  res.send(events)
})

app.get('/bets', (req, res) => {
  const bets = allData.flatMap(sport => sport.events
    .flatMap(event => event.participants
      .flatMap(participant => participant.bets.map(bet => bet))))

  res.send(bets)
})

app.get('/teams', (req, res) => {
  const teams = allData.flatMap(sport => sport.events
    .flatMap(event => event.participants
      .flatMap(participant => ({
        name: participant.name,
        id: participant.id
      }))))

  res.send(teams)
})

app.get('/sports', (req, res) => {
  const sports = allData.map(sport => ({
    name: sport.name,
    key: sport.key,
    eventIds: sport.events.map(event => event.id)
  }))

  res.send(sports)
})

app.post('/submit', (req, res) => {
  const betSubmission = req.body

  const submissionKeys = Object.keys(betSubmission)

  if (!submissionKeys.map(sKey => ['eventId', 'betId', 'teamId'].includes(sKey)).every(i => i)) {
    res.status(500).send('Your submission must include the keys betId, eventId, and teamId')

    return
  }

  const allEvents = allData.flatMap(sport => sport.events.map(event => event))

  const findBet = allEvents
    ?.find(event => event.id === betSubmission.eventId)?.participants
      ?.find(participant => participant.id === betSubmission.teamId)?.bets
        ?.find(bet => bet.id === betSubmission.betId)
  
  if (findBet) {
    res.sendStatus(200).send('Bet placed')
  } else {
    res.status(400).send('Bet cannot be found')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
