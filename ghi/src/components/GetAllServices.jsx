import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import '../css/ServiceList.css'

export default function ServiceList(props) {
    const admin = props.admin
    const darkmode = props.darkmode
    const { user, isLoggedIn } = useAuthService()
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
        const url = `${baseUrl}/api/services/${serviceId}`
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

    const [serviceImages, setServiceImages] = useState({})

    useEffect(() => {
        const fetchServiceImages = async () => {
            try {
                const imagePromises = services.map(async (service) => {
                    const response = await fetch(
                        `${baseUrl}/service_image/${service.id}`
                    )
                    if (response.ok) {
                        const imageData = await response.blob()
                        return {
                            id: service.id,
                            imageUrl: URL.createObjectURL(imageData),
                        }
                    } else {
                        console.error(
                            'Failed to fetch service image:',
                            response.statusText
                        )
                        return {
                            id: service.id,
                            imageUrl: null,
                        }
                    }
                })
                const resolvedImages = await Promise.all(imagePromises)
                const imageMap = {}
                resolvedImages.forEach((imageData) => {
                    imageMap[imageData.id] = imageData.imageUrl
                })
                setServiceImages(imageMap)
            } catch (error) {
                console.error('Error fetching service images:', error)
            }
        }
        fetchServiceImages()
    }, [services])

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div>
                <h1 className="display-5 fw-bold">Services</h1>
                <br />
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
                                <td className="w-25">{service.service}</td>
                                <td>
                                    {serviceImages[service.id] ? (
                                        <img
                                            src={serviceImages[service.id]}
                                            className="img-fluid img-thumbnail"
                                            alt="Service"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{service.description}</td>
                                <td>{service.cost}</td>
                                {isLoggedIn && admin && (
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
                                {isLoggedIn && admin && (
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
                                {!user && <td></td>}
                                {!user && <td></td>}
                                {user && (
                                    <td>
                                        {/* <button
                                            className="btn btn-primary"
                                            style={{ background: 'green' }}
                                        >
                                            Request Appointment
                                        </button> */}
                                        <a
                                            href={service.calendly_url}
                                            className="btn btn-primary"
                                            style={{ background: 'green' }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Request Appointment
                                        </a>
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

