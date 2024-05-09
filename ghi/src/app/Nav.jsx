import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import useAuthService from '../hooks/useAuthService'
import logo from '../images/PV_Logo.png'

function Nav(props) {
    const { isLoggedIn, signout } = useAuthService()
    const darkmode = props.darkmode
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav
            className={`nav navbar navbar-expand-lg${
                darkmode ? ' darkmode' : ''
            }`}
        >
            <div className="container-lg nav">
                <NavLink className="nav-style" to="/">
                    <img
                        src={logo}
                        alt="Pawsitive Vibes Logo"
                        style={{ height: 'auto', width: '18vh' }}
                    />
                </NavLink>
                <div className="nav-links">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
                        style={{ background: 'white', opacity: '25%' }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse${
                            isMenuOpen ? ' show' : ''
                        }`}
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-style" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-style" to="/pets">
                                    Pets
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-style" to="/services">
                                    Services
                                </NavLink>
                            </li>
                            {!isLoggedIn ? (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-style"
                                        to="/meetups"
                                    >
                                        Meetups
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-style dropdown-toggle"
                                            to="/community"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Community
                                        </Link>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <NavLink
                                                className="dropdown-item"
                                                to="/community"
                                            >
                                                Welcome!
                                            </NavLink>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/profile"
                                            >
                                                Profile
                                            </NavLink>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/meetups"
                                            >
                                                Meetups
                                            </NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-style"
                                            onClick={signout}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-style" to="/signin">
                                        Sign In
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
