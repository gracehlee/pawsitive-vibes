
import { useState, useEffect } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function CreateAppt() {
    const { user, error } = useAuthService()
    const [services, setServices] = useState([])

    const fetchData = async () => {
        const url = `${baseUrl}/api/services`
        const res = await fetch(url)
        if (res.ok) {
            const data = await res.json()
            setServices(data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [apptData, setApptData] = useState({
        user_id: user.id,
        name: '',
        email: '',
        cancel_url: '',
        reschedule_url: '',
        service_id: '',
        date: '',
        time: '',
    })

    useEffect(() => {
        if (user && user.username) {
            setApptData((formData) => ({
                ...formData,
                name: user.username,
            }))
        }
    }, [user])

    const handleInputChange = (event) => {
        const { name, value } = event.target


        setApptData({
            ...apptData,
            [name]: value,
        })

        if (name === 'service_id') {
            const selectedServiceId = parseInt(value)
            setApptData({
                ...apptData,
                [name]: selectedServiceId,
            })
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        console.log('Submitting appointment data:', apptData)

        const res = await fetch(`${baseUrl}/api/appointments`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(apptData),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log('Response from server:', res)

        if (!res.ok) {
            throw new Error('Could not create appointment')
        }

        const data = await res.json()
        setApptData({
            user_id: user.id,
            name: user ? user.username : '',
            email: '',
            cancel_url: '',
            reschedule_url: '',
            service_id: '',
            date: '',
            time: '',
        })

        return data
    }

    return (
        <div className="container">
            <div className="card shadow mt-4">
                <div className="card-body">
                    <h1 className="card-title text-center">
                        Request an Appointment
                    </h1>
                    <br></br>
                    <form onSubmit={handleFormSubmit}>
                        {error && (
                            <div className="alert alert-danger">
                                {error.message}
                            </div>
                        )}
                        <div className="mb-3">
                            <input
                                type="text"
                                value={apptData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Please tell us your name"
                                readOnly={true}
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="email"
                                value={apptData.email}
                                name="email"
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Email"
                            />
                            <label htmlFor="Email">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                onChange={handleInputChange}
                                value={apptData.service_id}
                                name="service_id"
                                id="service_id"
                                className="form-select"
                            >
                                <option value="">Choose a Service</option>
                                {services.map((service) => {
                                    return (
                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >
                                            {service.service}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="date"
                                value={apptData.date}
                                name="date"
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Date"
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="time"
                                value={apptData.time}
                                name="time"
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="time"
                            />
                            <label htmlFor="breed">Time</label>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}