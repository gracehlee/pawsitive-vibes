import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import '../css/ServiceList.css'
import handleFormatDate from '../components/handleFormatDate'
import handleFormatTime from '../components/handleFormatTime'

export default function MeetupsList(props) {
    const admin = props.admin
    const [meetups, setMeetups] = useState([])

    const fetchData = async () => {
        try {
            const url = `${baseUrl}/api/meetups`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setMeetups(data)
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

    const handleRemove = async (event) => {
        event.preventDefault()
        let id = event.target.value
        const url = `${baseUrl}/api/meetups/${id}`
        const fetchConfig = {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="col-md-10 offset-md-1 text-center">
            <div className="px-4 py-5 my-5 text-center">
                <div>
                    <h1 className="display-5 fw-bold">Meetups</h1>
                    <br />
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th style={{ width: '1px' }}></th>
                                <th style={{ width: '1px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetups.map((meetups, index) => (
                                <tr key={index}>
                                    <td>{meetups.name}</td>
                                    <td>{handleFormatDate(meetups.date)}</td>
                                    <td>{handleFormatTime(meetups.time)}</td>
                                    <td>{meetups.description}</td>
                                    <td>{meetups.location}</td>
                                    {admin && (
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                style={{ background: 'green' }}
                                                value={meetups.id}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    )}
                                    {admin && (
                                        <td>
                                            <button
                                                type="delete"
                                                onClick={handleRemove}
                                                value={meetups.id}
                                                className="btn btn-primary"
                                                style={{ background: 'red' }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    )}
                                    {!admin && <td></td>}
                                    {!admin && <td></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
