import '../styles/Header.scoped.scss'

// interface SbHeaderProps {
//   children: ReactNode
// }

const SbHeader = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  )
}

export default SbHeader
