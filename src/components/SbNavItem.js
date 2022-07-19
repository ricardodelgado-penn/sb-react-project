import SbIcon from "./SbIcon"
import '../styles/NavItem.scoped.scss'

// interface SbHeaderItemProps {
//   item: {
//     icon: string;
//     initials: string
//   }
// }

const SbNavItem = ({ item }) => (
  <div className="nav-item">
    <SbIcon icon={item.icon} />

    {item.label}
  </div>
)

export default SbNavItem
