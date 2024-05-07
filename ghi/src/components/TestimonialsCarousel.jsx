import { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { baseUrl } from '../services/authService'
import '../css/TestimonialsCarousel.css'
import '../css/darkmode.css'

function TestimonialsCarousel(props) {
    const [testimonials, setTestimonials] = useState([])
    const [error, setError] = useState(null)
    const darkmode = props.darkmode

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
            <Carousel
                variant='dark'
            >
                {testimonials.map((testimonial) => (
                    <Carousel.Item key={testimonial.id}>
                        <div
                            className="testimonial-item"
                            style={{
                                backgroundColor: darkmode ? 'black' : 'white',
                            }}
                        >
                            <h3 className="testimonial-name">&quot; {testimonial.description}  &quot;</h3>
                            <p className="testimonial-description">{testimonial.name}</p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default TestimonialsCarousel
