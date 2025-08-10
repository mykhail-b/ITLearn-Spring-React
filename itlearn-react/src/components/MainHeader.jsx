import { Link, useLocation } from 'react-router-dom'

function MainHeader ({ isAuthenticated }) {
  const location = useLocation()
  const links = [
    { path: '/courses', label: 'Courses' },
    { path: '/leaderboard', label: 'Leaderboard' },
  ]

  return (
    <header className="navbar navbar-expand bg-white shadow-sm fixed-top border-bottom px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-primary fs-4">
          <img
            src="./src/assets/logo.png"
            alt="Logo"
            style={{ width: 40, height: 'auto' }}
            className="me-2"
          />
          <span>IT Learn</span>
        </Link>

        {/* Nav */}
        <ul className="navbar-nav flex-row gap-4">
          {links.map(({ path, label }) => (
            <li className="nav-item" key={path}>
              <Link
                to={path}
                className={`nav-link text-dark ${location.pathname === path ? 'active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="d-flex gap-2 align-items-center">
          {isAuthenticated ? (

            <i className="bi bi-person-circle fs-3 text-primary"></i>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default MainHeader
