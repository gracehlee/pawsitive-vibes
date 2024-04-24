import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-lg">
                <NavLink className="navbar-brand" to="/">
                    Pawsitive Vibes
                </NavLink>
                <NavLink className="navbar-brand" to="/pets">
                    Create Pet
                </NavLink>
                <NavLink className="navbar-brand" to="/signup">
                    Sign Up
                </NavLink>
                <NavLink className="navbar-brand" to="/signin">
                    Sign In
                </NavLink>
            </div>
        </nav>
    )
}

export default Nav
