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

    const deleteTestimonial = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/testimonials/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                SetTestimonials((prevTestimonials) =>
                    prevTestimonials.filter(
                        (testimonial) => testimonial.id !== id
                    )
                )
            } else {
                throw new Error('Failed to delete testimonial')
            }
        } catch (error) {
            setError(`Error deleting testimonial: ${error.message}`)
        }
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="testimonials-container">
                <h1 className="text-center">Testimonials</h1>
                <div>
                    <br />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Rating</th>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Approval</th>
                                <th>Action</th>
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
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteTestimonial(
                                                    testimonial.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-center">
                    <br />
                    <Link className="fontcolor" to="/">
                        <button
                            className="btn btn-primary"
                            style={{
                                background: darkmode ? 'black' : 'blue',
                                color: darkmode ? 'white' : '',
                            }}
                        >
                            Back to Home
                        </button>
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default TestimonialsList
