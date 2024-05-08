import 'bootstrap/dist/css/bootstrap.css'
import ServiceList from '../components/GetAllServices'
import { useNavigate } from 'react-router-dom'


function Services(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const navigate = useNavigate()

    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/createservice')
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="text-center" style={{ margin: "20px" }}>
                {admin && (
                    <button
                        className="btn btn-primary"
                        style={{ background: 'green ' }}
                        onClick={handleNavigate}
                    >
                        Add a Service
                    </button>
                )}

                <ServiceList admin={admin} />

            </div>
        </main>
    )
}

export default Services
