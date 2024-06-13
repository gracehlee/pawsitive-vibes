import 'bootstrap/dist/css/bootstrap.css'
import ServiceList from '../components/GetAllServices'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

function Services(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const navigate = useNavigate()
    const { isLoggedIn } = useAuthService()
    const CALENDLY_API = import.meta.env.VITE_CALENDLY

    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/createservice')
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="text-center" style={{ margin: '50px' }}>
                <ServiceList admin={admin} />
                {isLoggedIn && admin && (
                    <button
                        className="btn btn-primary"
                        style={{
                            background: darkmode ? 'black' : 'green',
                            color: darkmode ? 'white' : '',
                        }}
                        onClick={handleNavigate}
                    >
                        Add a Service
                    </button>
                )}
                <div
                    className="calendly-inline-widget text-center"
                    data-url={CALENDLY_API}
                    style={{ minWidth: '320px', height: '700px' }}
                ></div>
            </div>
        </main>
    )
}

export default Services
