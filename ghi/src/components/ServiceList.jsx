import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import '../css/ServiceList.css'

export default function ServiceList(props) {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState(null)

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

    useEffect(() => {
        fetchData()
        if (props.pollService) {
            const polling = setInterval(fetchData, 1)
            return () => clearInterval(polling)
        }
    })

    const handleServiceClick = (serviceId) => {
        setSelectedService(serviceId)
    }

    const fetchServiceById = async (serviceId) => {
        try {
            const url = `${baseUrl}/api/services/${serviceId}`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setSelectedService(data)
            } else {
                console.error('Error fetching service:', res.statusText)
            }
        } catch (error) {
            console.error('Error fetching service:', error)
        }
    }

    useEffect(() => {
        if (selectedService) {
            fetchServiceById(selectedService)
            if (props.pollService) {
                const polling = setInterval(fetchServiceById, 1)
                return () => clearInterval(polling)
            }
        }
    })

    const handleBackToList = () => {
        setSelectedService(null)
    }

    return (
        <div className="px-4 py-5 my-5 text-center">
            {selectedService ? (
                <div>
                    <h1 className="display-5 fw-bold">
                        {selectedService.service}
                    </h1>
                    <div className="col-lg-6 mx-auto">
                        <img
                            src={selectedService.picture_url}
                            className="img-fluid img-thumbnail"
                            alt="Service"
                        />
                    </div>
                    <div>
                        <p>Duration: {selectedService.duration}</p>
                        <p>Cost: {selectedService.cost}</p>
                        <p>Description: {selectedService.description}</p>
                        <Link to="create-appt">
                            <button className="btn btn-primary">
                                Book Now
                            </button>
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={handleBackToList}
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="display-5 fw-bold">Services</h1>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Image</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr
                                    key={service.service}
                                    onClick={() =>
                                        handleServiceClick(service.id)
                                    }
                                >
                                    <td>{service.service}</td>
                                    <td className="w-25">
                                        <img
                                            src={service.picture_url}
                                            className="img-fluid img-thumbnail"
                                            alt="Service"
                                        />
                                    </td>
                                    <td>{service.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
