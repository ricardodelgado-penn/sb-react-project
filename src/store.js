import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from './api'

export const useStore = create(devtools(
  (set) => ({
    data: {
      allSports: [],
      sports: [],
      teams: [],
      events: [],
      bets: []
    },

    fetchAllData: () => {
      Promise.all([
        api.get('sports'),
        api.get('all-sports'),
        api.get('teams'),
        api.get('bets'),
        api.get('events'),
      ])
        .then(([
          sportsResponse,
          allSportsResponse,
          teamsResponse,
          betsResponse,
          eventsResponse
        ]) => {
          set({
            data: {
              allSports: allSportsResponse.data,
              sports: sportsResponse.data,
              teams: teamsResponse.data,
              bets: betsResponse.data,
              events: eventsResponse.data,
            }
          })
        })
    },

    submitBet: bet => {
      api.post('submit', {
        data: {
          ...bet
        }
      })
        .then(console.log)
        .catch(console.warn)
    }
  })
))
