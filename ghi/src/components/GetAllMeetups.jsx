import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import '../css/ServiceList.css'
import handleFormatDate from '../components/handleFormatDate'
import handleFormatTime from '../components/handleFormatTime'

export default function MeetupsList(props) {
    const admin = props.admin
    const [meetups, setMeetups] = useState([])
    const [history, setHistory] = useState([])
    const { isLoggedIn, user } = useAuthService()
    const fetchData = async () => {
        try {
            const url = `${baseUrl}/api/meetups?timestamp=${Date.now()}`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()

                setHistory(data)
                const filteredMeetups = data.filter((meetup) => {
                    const meetupDateTime = new Date(
                        meetup.date + 'T' + meetup.time
                    )
                    return meetupDateTime > Date.now()
                })
                setMeetups(filteredMeetups)
            } else {
                console.error('Error fetching meetups:', res.statusText)
            }
        } catch (error) {
            console.error('Error fetching meetups:', error)
        }
    }

    const navigate = useNavigate()
    const handleEdit = async (event) => {
        let id = event.target.value
        navigate(`/meetups/${id}`)
    }

    const handleRemove = async (event, meetupsId) => {
        event.preventDefault()
        const url = `${baseUrl}/api/meetups/${meetupsId}`
        const fetchConfig = {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setMeetups((prevMeetUps) =>
                prevMeetUps.filter((meetups) => meetups.id !== meetupsId)
            )
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="px-4 py-5 my-5">
                        <h1 className="display-5 fw-bold text-center mb-4">
                            Meetups
                        </h1>
                        <p className="text-center">
                            Mobile view? Swipe left to view details.
                        </p>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Description</th>
                                        <th>Location</th>
                                        {user && admin && (
                                            <>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {meetups.map((meetup, index) => (
                                        <tr key={index}>
                                            <td>{meetup.name}</td>
                                            <td>
                                                {handleFormatDate(meetup.date)}
                                            </td>
                                            <td>
                                                {handleFormatTime(meetup.time)}
                                            </td>
                                            <td>{meetup.description}</td>
                                            <td>{meetup.location}</td>
                                            {isLoggedIn && admin && (
                                                <>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            style={{
                                                                background:
                                                                    'green',
                                                            }}
                                                            value={meetup.id}
                                                            onClick={handleEdit}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                handleRemove(
                                                                    e,
                                                                    meetup.id
                                                                )
                                                            }
                                                            className="btn btn-primary"
                                                            style={{
                                                                background:
                                                                    'red',
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <br />
                        {user && admin && (
                            <>
                                <h1 className="display-5 fw-bold text-center mb-4">
                                    Meetups History
                                </h1>
                                <br />
                                <p className="text-center">
                                    List of all meetups created.
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Description</th>
                                                <th>Location</th>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((meetup, index) => (
                                                <tr key={index}>
                                                    <td>{meetup.name}</td>
                                                    <td>
                                                        {handleFormatDate(
                                                            meetup.date
                                                        )}
                                                    </td>
                                                    <td>
                                                        {handleFormatTime(
                                                            meetup.time
                                                        )}
                                                    </td>
                                                    <td>
                                                        {meetup.description}
                                                    </td>
                                                    <td>{meetup.location}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            style={{
                                                                background:
                                                                    'green',
                                                            }}
                                                            value={meetup.id}
                                                            onClick={handleEdit}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                handleRemove(
                                                                    e,
                                                                    meetup.id
                                                                )
                                                            }
                                                            className="btn btn-primary"
                                                            style={{
                                                                background:
                                                                    'red',
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
