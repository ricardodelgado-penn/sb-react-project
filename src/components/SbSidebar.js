import '../styles/Sidebar.scoped.scss'

const SbSidebar = ({ children }) => {
  return (
    <aside className="sidebar">
      {children}
    </aside>
  )
}

export default SbSidebar
