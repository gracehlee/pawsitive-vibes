import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function CreateMeetup() {
    const { error } = useAuthService()

    const [meetupFormData, setMeetupFormData] = useState({
        name: '',
        date: '',
        time: '',
        description: '',
        location: '',
    })


    const handleInputChange = (event) => {
        setMeetupFormData({
            ...meetupFormData,
            [event.target.name]: event.target.value,
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    async function handleFormSubmit(e) {
        e.preventDefault()

        const res = await fetch(`${baseUrl}/api/meetups`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(meetupFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error('Could not create Meetup')
        }
        window.location.reload()
        const data = await res.json()
        return data
    }

    return (
        <div className="container">
            <div className="row shadow mt-4">
                <h1 className="card-title text-center">Add a Meetup</h1>
                <form onSubmit={handleFormSubmit}>
                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input
                            required
                            type="text"
                            value={meetupFormData.name}
                            name="name"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Name of the Meetup"
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            required
                            type="date"
                            value={meetupFormData.date}
                            name="date"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="date"
                        />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            required
                            type="time"
                            value={meetupFormData.time}
                            name="time"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="time"
                        />
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            required
                            type="text"
                            value={meetupFormData.description}
                            name="description"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Description"
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            required
                            type="text"
                            name="location"
                            value={meetupFormData.location}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Image URL"
                        />
                        <label htmlFor="location">Location</label>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <br></br>
                </form>
            </div>
        </div>
    )
}
