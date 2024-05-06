import { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { baseUrl } from '../services/authService'
import '../css/TestimonialsCarousel.css'

function TestimonialsCarousel() {
    const [testimonials, setTestimonials] = useState([])
    const [error, setError] = useState(null)

    const fetchApprovedTestimonials = async () => {
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
                setTestimonials(
                    data.filter((testimonial) => testimonial.approved)
                )
            } else {
                throw new Error('Failed to fetch testimonials')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchApprovedTestimonials()
    }, [])

    if (error) {
        return <p className="error">{error}</p>
    }

    return (
        <div className="testimonials-carousel-container">
            <Carousel>
                {testimonials.map((testimonial) => (
                    <Carousel.Item key={testimonial.id}>
                        <div className="testimonial-item">
                            <h3>{testimonial.name}</h3>
                            <p>Rating: {testimonial.rating}</p>
                            <p>"{testimonial.description}"</p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default TestimonialsCarousel
