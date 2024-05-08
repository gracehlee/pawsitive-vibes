import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import '../css/ServiceList.css'

export default function ServiceList(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const { user } = useAuthService()
    const [services, setServices] = useState([])

    const fetchData = async () => {
        try {
            const url = `${baseUrl}/api/services`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setServices(data)
            } else {
                console.error('Error fetching services:', res.statusText)
            }
        } catch (error) {
            console.error('Error fetching services:', error)
        }
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        const serviceId = event.target.value
        console.log("service id is:", serviceId)
        const url = `${baseUrl}/api/services/${serviceId}`
        console.log("services url:", url)
        const fetchConfig = {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
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
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div>
                <h1 className="display-5 fw-bold">Services</h1>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th style={{ width: '1px' }}></th>
                            <th style={{ width: '1px' }}></th>
                            <th style={{ width: '1px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={index}>
                                <td className="w-25">
                                    <img
                                        src={service.picture_url}
                                        className="img-fluid img-thumbnail"
                                        alt="Service"
                                    />
                                </td>
                                <td>{service.service}</td>
                                <td>{service.description}</td>
                                <td>{service.cost}</td>
                                {admin && (
                                    <td>
                                        <Link
                                            to={`/updateservice/${service.id}`}
                                        >
                                            <button
                                                className="btn btn-primary"
                                                style={{
                                                    background: 'green',
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                )}
                                {admin && (
                                    <td>
                                        <button
                                            type="delete"
                                            onClick={handleRemove}
                                            value={service.id}
                                            className="btn btn-primary"
                                            style={{ background: 'red' }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                )}
                                {!admin && <td></td>}
                                {!admin && <td></td>}
                                {!user && <td></td>}
                                {user && (
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            style={{ background: 'green' }}
                                        >
                                            Request Appointment
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
