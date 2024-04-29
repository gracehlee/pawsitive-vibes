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
                <NavLink className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="Pawsitive Vibes Logo"
                        style={{ height: '80px', width: '140px' }}
                    />
                </NavLink>
                <NavLink className="nav navbar-brand" to="/dogs">
                    Dogs
                </NavLink>
                <NavLink className="nav navbar-brand" to="/services">
                    Services
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink className="nav navbar-brand" to="/community">
                            Community
                        </NavLink>
                        <Link className="nav navbar-brand" onClick={signout}>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <>
                        <NavLink className="navbar-brand" to="/signin">
                            Sign In
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
