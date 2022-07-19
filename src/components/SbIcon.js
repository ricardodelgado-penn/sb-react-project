import { ReactComponent as MlbIcon } from './icons/MlbIcon.svg'
import { ReactComponent as NflIcon } from './icons/NflIcon.svg'
import { ReactComponent as NbaIcon } from './icons/NbaIcon.svg'
import { ReactComponent as NhlIcon } from './icons/NhlIcon.svg'

import '../styles/Icon.scoped.scss'

const SbIcon = ({ icon }) => {
  if (icon === 'mlb') return <MlbIcon className='icon' />
  if (icon === 'nfl') return <NflIcon className='icon' />
  if (icon === 'nba') return <NbaIcon className='icon' />
  if (icon === 'nhl') return <NhlIcon className='icon' />

  return 'Loading...'
}

export default SbIcon
