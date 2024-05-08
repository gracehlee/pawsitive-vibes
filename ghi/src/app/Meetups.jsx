import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import GetAllMeetups from '../components/GetAllMeetups'
import { useNavigate } from 'react-router-dom'


export default function Meetups(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const navigate = useNavigate()

    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/meetups/create')
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        {admin && (
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
                    <div>{<GetAllMeetups admin={admin} />}</div>
                </div>
            </div>
        </main>
    )
}
