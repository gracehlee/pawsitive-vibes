// import { NavLink, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import useAuthService from '../hooks/useAuthService'
import '../css/sidenav.css'

// import logo from '../images/PV_Logo.png'

function SideNav() {
    const { isLoggedIn } = useAuthService()

    return (
        <>
            <div className="sidenav-content">
                {isLoggedIn ? (
                    <>
                        <p>O</p>
                    </>
                ) : (
                    <>
                        <p>X</p>
                    </>
                )}
                <div>hi</div>
            </div>
        </>
    )
}

export default SideNav
