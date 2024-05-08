import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from '../services/authService'
import '../css/UpdateService.css'
import { useNavigate } from 'react-router-dom'


export default function UpdateService(props) {
    const darkmode = props.darkmode
    const navigate = useNavigate()
    const { serviceId } = useParams()
    const [service, setService] = useState({
        service: '',
        description: '',
        picture_url: '',
        duration: 0,
        cost: '',
        calendly_url: '',
    })

    const [showMessage, setShowMessage] = useState('')
    const [alert, setAlert] = useState('')

    useEffect(() => {
        const fetchService = async () => {
            try {
                const url = `${baseUrl}/api/services/${serviceId}`
                const res = await fetch(url)
                if (res.ok) {
                    const data = await res.json()
                    setService(data)
                } else {
                    console.error('Error fetching service:', res.statusText)
                }
            } catch (error) {
                console.error('Error fetching service:', error)
            }
        }
        fetchService()
    }, [serviceId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${baseUrl}/api/services/${serviceId}`
            const res = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            })
            if (res.ok) {
                navigate('/services')
            } else {
                console.error('Error updating service:', res.statusText)
                setAlert('danger')
                setShowMessage('Error updating service.')
            }
        } catch (error) {
            console.error('Error updating service:', error)
            setAlert('danger')
            setShowMessage('Error updating service.')
        }
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <h1 className="text-center my-5 ">Edit Service</h1>
                {showMessage && (
                    <div className={`alert alert-${alert}`} role="alert">
                        {showMessage}
                    </div>
                )}
                <form className="updateform" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="service" className="form-label">
                            Service Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="service"
                            name="service"
                            value={service.service}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={service.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="picture_url" className="form-label">
                            Picture URL
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="picture_url"
                            name="picture_url"
                            value={service.picture_url}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">
                            Duration
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="duration"
                            name="duration"
                            value={service.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">
                            Cost
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cost"
                            name="cost"
                            value={service.cost}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="calendly_url" className="form-label">
                            Calendly Link
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="calendly_url"
                            name="calendly_url"
                            value={service.calendly_url}
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        className="button-container"
                        style={{ marginBottom: '20px' }}
                    >
                        <Link to="/services"
                        className="btn btn-primary">
                            Go Back
                        </Link>
                        <button type="submit"
                        className="btn btn-primary"
                        style={{ background: "green" }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
