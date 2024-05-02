import { NavLink, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import useAuthService from '../hooks/useAuthService'
import logo from '../images/PV_Logo.png'

function Nav() {
    const { isLoggedIn, signout } = useAuthService()

    return (
        <nav className="nav navbar navbar-expand-lg">
            <div className="container-lg nav">
                <NavLink className="nav-style" to="/">
                    <img
                        src={logo}
                        alt="Pawsitive Vibes Logo"
                        style={{ height: '10vh', width: '18vh' }}
                    />
                </NavLink>
                <NavLink className="nav-style" to="/pets">
                    Pets
                </NavLink>
                <NavLink className="nav-style" to="/services">
                    Services
                </NavLink>
                <NavLink className="nav-style" to="/testimonials">
                    Testimonials
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <div className="nav-item dropdown">
                            <NavLink
                                className="nav-style dropdown-toggle"
                                to="/community"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Community
                            </NavLink>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/community"
                                    >
                                        Welcome!
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/profile"
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <Link className="nav-style" onClick={signout}>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <>
                        <NavLink className="nav-style" to="/signin">
                            Sign In
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
