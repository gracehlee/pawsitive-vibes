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
        console.log(error)
        return
    }

    const generateStars = (rating) => {
        return Array.from({ length: rating }, (_, index) => (
            <span
                key={index}
                style={{ color: 'gold', fontSize: '30px', marginRight: '2px' }}
            >
                ★
            </span>
        ))
    }

    return (
        <div className="testimonials-carousel-container text-center">
            <Carousel variant="dark">
                {testimonials.map((testimonial) => (
                    <Carousel.Item key={testimonial.id}>
                        <div
                            className="testimonial-item"
                            style={{
                                backgroundColor: darkmode ? 'black' : 'white',
                            }}
                        >
                            <h3
                                className="testimonial-name"
                                style={{ color: darkmode ? 'white' : '' }}
                            >
                                &quot;{testimonial.description}&quot;
                            </h3>
                            <div>{generateStars(testimonial.rating)}</div>
                            <p
                                className="testimonial-description"
                                style={{
                                    fontSize: '25px',
                                    color: darkmode ? 'white' : '',
                                }}
                            >
                                {testimonial.name}
                            </p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default TestimonialsCarousel
