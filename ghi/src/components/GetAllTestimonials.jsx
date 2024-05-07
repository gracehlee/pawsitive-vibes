import { useState, useEffect } from 'react'
import { baseUrl } from '../services/authService'
import '../css/Testimonials.css'
import { Link } from 'react-router-dom'

function TestimonialsList(props) {
    const [testimonials, SetTestimonials] = useState([])
    const [error, setError] = useState(null)
    const darkmode = props.darkmode

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/testimonials`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const data = await response.json()
                SetTestimonials(data)
            } else {
                throw new Error('Failed to fetch testimonials')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const handleToggleApproval = async (id, currentStatus) => {
        try {
            const response = await fetch(`${baseUrl}/api/testimonials/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: !currentStatus }),
            })

            if (response.ok) {
                SetTestimonials(
                    testimonials.map((testimonial) =>
                        testimonial.id === id
                            ? { ...testimonial, approved: !currentStatus }
                            : testimonial
                    )
                )
            } else {
                throw new Error('Failed to approve testimonial')
            }
        } catch (error) {
            setError('Failed to approve testimonial: ${error.message}')
        }
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="testimonials-container">
                <h1 className="text-center">Testimonials</h1>
                <div>
                    <br></br>
                </div>
                {error && <p className="error">{error}</p>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Rating</th>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial.id}>
                                <td>{testimonial.id}</td>
                                <td>{testimonial.rating}</td>
                                <td>{testimonial.name}</td>
                                <td>{testimonial.description}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={testimonial.approved}
                                        onChange={() =>
                                            handleToggleApproval(
                                                testimonial.id,
                                                testimonial.approved
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-center">
                    <br></br>
                    <button className="btn btn-secondary">
                        <Link className="fontcolor" to="/">
                            Back to Home
                        </Link>
                    </button>
                </p>
            </div>
        </main>
    )
}

export default TestimonialsList
