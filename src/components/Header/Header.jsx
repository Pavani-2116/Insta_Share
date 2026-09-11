import {useNavigate} from 'react-router-dom'
import {
  FiSearch,
  FiHome,
  FiUser,
  FiLogOut,
} from 'react-icons/fi'
import './Header.css'

const Header = ({
  searchInput,
  setSearchInput,
  onSearch,
}) => {
  const navigate = useNavigate()

  const onLogout = () => {
    document.cookie = 'jwt_token=; path=/; max-age=0'
    navigate('/login', {replace: true})
  }

  const onLogoClick = () => {
    navigate('/')
  }

  const handleSearchChange = event => {
    setSearchInput(event.target.value)
  }

  const handleSearchSubmit = event => {
    event.preventDefault()

    if (onSearch) {
      onSearch(event)
    }
  }

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <button
          type="button"
          className="header-logo-button"
          onClick={onLogoClick}
          aria-label="Go to home"
        >
          <div className="header-logo-icon">
            ◎
          </div>

          <span className="header-logo-text">
            Insta Share
          </span>
        </button>

        {/* Search */}
        <form
          className="search-container"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            className="search-input"
            placeholder="Search Caption"
            value={searchInput}
            onChange={handleSearchChange}
            aria-label="Search caption"
          />

          <button
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            <FiSearch />
          </button>
        </form>

        {/* Navigation */}
        <nav className="header-nav">

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate('/')}
          >
            <FiHome />
            <span>Home</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate('/my-profile')}
          >
            <FiUser />
            <span>Profile</span>
          </button>

          <button
            type="button"
            className="nav-item logout-button"
            onClick={onLogout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>

        </nav>

      </div>
    </header>
  )
}

export default Header