import { useState, useEffect } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import StarRating from './StarRating'

function TestimonialForm() {
    const { user, error: authError } = useAuthService()

    const [testimonialFormData, setTestimonialFormData] = useState({
        rating: '',
        name: '',
        description: '',
    })
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (user && user.username) {
            setTestimonialFormData((formData) => ({
                ...formData,
                name: user.username,
            }))
        }
    }, [user])

    const handleInputChange = (event) => {
        setTestimonialFormData({
            ...testimonialFormData,
            [event.target.name]: event.target.value,
        })
    }

    const handleRatingChange = (newRating) => {
        setTestimonialFormData({
            ...testimonialFormData,
            rating: newRating,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setFormError(null)

        if (!testimonialFormData.rating || testimonialFormData.rating === 0) {
            setFormError('Please provide a star rating before submitting.')
            return
        }

        try {
            const response = await fetch(`${baseUrl}/api/testimonials`, {
                method: 'post',
                body: JSON.stringify(testimonialFormData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                if (errorData && errorData.errors) {
                    const errorMessage = errorData.errors
                        .map((error) => error.message)
                        .join(', ')
                    setFormError(`Validation Error: ${errorMessage}`)
                } else {
                    setFormError('Could not add Testimonial')
                }
                return
            }

            const data = await response.json()

            setTestimonialFormData({
                rating: 0,
                name: user ? user.username : '',
                description: '',
            })
            return data
        } catch (error) {
            setFormError(`An error occurred: ${error.message}`)
        }
    }

    return (
        <div className="container">
            <div className="card-body">
                <h1 className="card-title text-center">
                    Tell us what you think!
                </h1>
                <form onSubmit={handleSubmit}>
                    {authError && (
                        <div className="alert alert-danger">
                            {authError.message}
                        </div>
                    )}
                    {formError && (
                        <div className="alert alert-danger">{formError}</div>
                    )}
                    <div className="mb-3 text-center">
                        <StarRating
                            count={5}
                            value={testimonialFormData.rating}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={testimonialFormData.name}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Please tell us your name"
                            readOnly={true}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            required
                            value={testimonialFormData.description}
                            name="description"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Feedback"
                            rows="4"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit"
                        className="btn btn-primary"
                        style={{ background: "green" }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TestimonialForm
