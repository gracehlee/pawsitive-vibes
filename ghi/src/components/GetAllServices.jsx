import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import '../css/ServiceList.css'

export default function ServiceList(props) {
    const admin = props.admin
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

    const handleRemove = async (event, serviceId) => {
        event.preventDefault()
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
            setServices((prevServices) =>
                prevServices.filter((service) => service.id !== serviceId)
            )
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

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="px-4 py-5 my-5">
                        <h1 className="display-5 fw-bold text-center mb-4">
                            Services
                        </h1>
                        <p>
                            Mobile view? Swipe left to request an appointment.
                        </p>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Cost</th>
                                        {user && admin && (
                                            <>
                                                <th>Edit</th>
                                                <th>Remove</th>
                                            </>
                                        )}
                                        {user && !admin && (
                                            <>
                                                <th>Request Appointment</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service, index) => (
                                        <tr key={index}>
                                            <td>{service.service}</td>
                                            <td>
                                                {serviceImages[service.id] ? (
                                                    <img
                                                        src={
                                                            serviceImages[
                                                                service.id
                                                            ]
                                                        }
                                                        className="img-fluid img-thumbnail"
                                                        alt="Service"
                                                        style={{
                                                            height: '100px',
                                                        }}
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                            </td>
                                            <td>{service.description}</td>
                                            <td>{service.cost}</td>
                                            {isLoggedIn && admin && (
                                                <>
                                                    <td>
                                                        <Link
                                                            to={`/updateservice/${service.id}`}
                                                        >
                                                            <button
                                                                className="btn btn-primary"
                                                                style={{
                                                                    background:
                                                                        'green',
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                handleRemove(
                                                                    e,
                                                                    service.id
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
                                            {user && !admin && (
                                                <td>
                                                    <a
                                                        href={
                                                            service.calendly_url
                                                        }
                                                        className="btn btn-primary"
                                                        style={{
                                                            background: 'green',
                                                        }}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
