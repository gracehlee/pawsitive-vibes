import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import '../css/ServiceList.css'

export default function MeetupsList() {
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

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="col-md-10 offset-md-1 text-center">
            <div className="px-4 py-5 my-5 text-center">
                <div>
                    <h1 className="display-5 fw-bold">Meetups</h1>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetups.map((meetups, index) => (
                                <tr key={index}>
                                    <td>{meetups.name}</td>
                                    <td>{meetups.date}</td>
                                    <td>{meetups.time}</td>
                                    <td>{meetups.description}</td>
                                    <td>{meetups.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
