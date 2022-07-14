import create from 'zustand'
import { api } from './api'

export const useStore = create((set) => ({
  data: {
    sports: [],
    teams: [],
    events: [],
    bets: []
  },

  fetchAllData: () => {
    return api.get('sports')
      .then(({ data }) => {
        set({
          data: {
            sports: data
          }
        })

        console.log(data)
      })
  }
}))
