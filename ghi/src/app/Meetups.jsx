import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import GetAllMeetups from '../components/GetAllMeetups'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

export default function Meetups(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const navigate = useNavigate()
    const { isLoggedIn } = useAuthService()

    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/meetups/create')
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="row">
                <div>{<GetAllMeetups admin={admin} />}</div>
                <div className="text-center">
                    {admin && isLoggedIn && (
                        <div>
                            <button
                                className="btn btn-primary"
                                style={{ background: 'green ' }}
                                onClick={handleNavigate}
                            >
                                Create a Meetup
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
