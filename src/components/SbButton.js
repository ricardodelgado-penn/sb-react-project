import '../styles/Button.scoped.scss'

const SbButton = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default SbButton
