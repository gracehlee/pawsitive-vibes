import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import CreateMeetups from '../components/CreateMeetups'
import GetAllMeetups from '../components/GetAllMeetups'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function Meetups(props) {
    const { isLoggedIn } = useAuthService()
    const admin = props.admin
    const darkmode = props.darkmode
    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)

    const handleCreateMeetup = () => {
        setCreateForm(true)
        setCloseForm(false)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        {isLoggedIn && admin && (
                            <div>
                                {createForm && <CreateMeetups admin={admin} />}
                                {closeForm && (
                                    <button
                                        className="btn btn-dark"
                                        onClick={handleCreateMeetup}
                                    >
                                        Add a Meetup
                                    </button>
                                )}
                            </div>
                        )}

                        <div>
                            <br></br>
                            {createForm && admin && isLoggedIn && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseForm}
                                >
                                    Close Form
                                </button>
                            )}
                        </div>
                    </div>
                    <div>{<GetAllMeetups admin={admin} />}</div>
                </div>
            </div>
        </main>
    )
}
