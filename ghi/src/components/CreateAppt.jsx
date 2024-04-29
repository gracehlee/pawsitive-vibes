// @ts-check
import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function CreateAppt() {
    const { user, error } = useAuthService()

    const [apptData, setApptData] = useState({
        user_id: user.id,
        name: '',
        email: '',
        cancel_url: '',
        reschedule_url: '',
        service_id: '',
        approved: 'false',
        date: '',
        time: ''
    })

    const handleInputChange = (event) => {
        setApptData({
            ...apptData,
            [event.target.name]: event.target.value,
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    async function handleFormSubmit(e) {
        e.preventDefault()

        const res = await fetch(`${baseUrl}/api/appointments`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(apptData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error('Could not create appointment')
        }
        const data = await res.json()
        return data
    }
    return (
        <div className="container">
            <div className="card shadow mt-4">
                <div className="card-body">
                    <h1 className="card-title text-center">Request an Appointment</h1>
                    <br></br>
                    <form onSubmit={handleFormSubmit}>
                        {error && (
                            <div className="alert alert-danger">
                                {error.message}
                            </div>
                        )}
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
                            <label htmlFor="date">
                                Date
                            </label>
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
