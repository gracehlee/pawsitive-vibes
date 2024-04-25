import { NavLink, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import useAuthService from '../hooks/useAuthService'
import logo from '../images/PV_Logo.png'

function Nav() {
    const { isLoggedIn, signout } = useAuthService()

    // This commented out code will be used to check admin status of user later
    // const { user } = useAuthService()

    // if (user) {
    //     console.log('my user:', user.username)
    // }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-lg">
                <NavLink className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="Pawsitive Vibes Logo"
                        style={{ height: '80px', width: '140px' }}
                    />
                </NavLink>
                <NavLink className="navbar-brand" to="/dogs">
                    Dogs
                </NavLink>
                <NavLink className="navbar-brand" to="/services">
                    Services
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <Link className="navbar-brand" onClick={signout}>
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
