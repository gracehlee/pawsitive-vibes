import { NavLink, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import useAuthService from '../hooks/useAuthService'

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
                    Pawsitive Vibes
                </NavLink>
                <NavLink className="navbar-brand" to="/pets">
                    Aussie Dogs
                </NavLink>
                {isLoggedIn ? (
                    <Link className="navbar-brand" onClick={signout}>
                        Sign Out
                    </Link>
                ) : (
                    <>
                        <NavLink className="navbar-brand" to="/signup">
                            Sign Up
                        </NavLink>
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
