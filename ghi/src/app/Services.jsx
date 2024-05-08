import 'bootstrap/dist/css/bootstrap.css'
import ServiceList from '../components/GetAllServices'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

function Services(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const navigate = useNavigate()
    const { isLoggedIn } = useAuthService()

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
                        style={{ background: 'green ' }}
                        onClick={handleNavigate}
                    >
                        Add a Service
                    </button>
                )}
            </div>
        </main>
    )
}

export default Services
