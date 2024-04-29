import 'bootstrap/dist/css/bootstrap.css'
import TestimonialForm from '../components/TestimonialsForm'
import useAuthService from '../hooks/useAuthService'

function Testimonials() {
    const { isLoggedIn } = useAuthService();

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center">
                        <h1>Testimonials</h1>
                        {isLoggedIn && <TestimonialForm />}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Testimonials
