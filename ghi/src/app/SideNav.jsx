import 'bootstrap/dist/css/bootstrap.css'
import '../css/sidenav.css'
import icon from '../images/darkmode.png'
import { useState } from 'react'

function SideNav() {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.body.classList.toggle('dark-mode')
    }

    return (
        <>
            <button className="toggle" onClick={toggleDarkMode}>
                {darkMode ? (
                    <div
                        style={{
                            backgroundColor: 'grey',
                            borderRadius: '2vw',
                            height: '2.5vw',
                            width: '2.5vw',
                            alignContent: 'center',
                        }}
                    >
                        <img
                            src={icon}
                            alt="Dark Mode"
                            style={{
                                height: '31px',
                                width: '31px',
                            }}
                        />
                    </div>
                ) : (
                    // Light mode
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '2vw',
                            height: '2.5vw',
                            width: '2.5vw',
                            alignContent: 'center',
                        }}
                    >
                        <img
                            src={icon}
                            alt="Dark Mode"
                            style={{
                                height: '31px',
                                width: '31px',
                            }}
                        />
                    </div>
                )}
            </button>
        </>
    )
}

export default SideNav
