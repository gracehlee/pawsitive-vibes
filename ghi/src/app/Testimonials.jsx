import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import TestimonialForm from '../components/TestimonialsForm'
import useAuthService from '../hooks/useAuthService'

function Testimonials() {
    const { isLoggedIn } = useAuthService()

    return (
        <main>
            <div className="container">
                <div className="row">
                    <h1 className="text-center">Testimonials</h1>
                    {isLoggedIn && <TestimonialForm />}
                </div>
            </div>
        </main>
    )
}

export default Testimonials
