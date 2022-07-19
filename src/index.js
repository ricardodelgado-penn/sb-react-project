import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useStore } from './store'
import SbContent from './components/SbContent'
import SbHeader from './components/SbHeader'
import SbNavItem from './components/SbNavItem'
import SbSidebar from './components/SbSidebar'
import './index.css'
import './styles/Home.scoped.scss'

const App = () => {
  const { allSports, fetchAllData } = useStore((state) => ({
    allSports: state.data.allSports,
    fetchAllData: state.fetchAllData
  }))

  const capitalize = term => term.toUpperCase()

  const sidebarItems = [
    {
      label: 'Home',
      icon: 'nfl'
    },
    {
      label: 'Bets',
      icon: 'mlb'
    },
    {
      label: 'Preferences',
      icon: 'nhl'
    },
    {
      label: 'Settings',
      icon: 'nba'
    }
  ]

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <article className="container">
      <SbHeader className="header">
        {allSports.map(sport => (
          <SbNavItem
            key={sport.key}
            item={{
              label: capitalize(sport.key),
              icon: sport.key
            }}
          />
        ))}
      </SbHeader>

      <SbSidebar className="sidebar">
        {sidebarItems.map(item => (
          <SbNavItem key={item.icon} item={item} />
        ))}
      </SbSidebar>

      <SbContent className="content" />
    </article>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
