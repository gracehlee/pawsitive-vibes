import '../css/Testimonials.css'
import TestimonialForm from '../components/TestimonialsForm'
import useAuthService from '../hooks/useAuthService'
import { Link } from 'react-router-dom'

function Testimonials(props) {
    const { isLoggedIn } = useAuthService()
    const darkmode = props.darkmode

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="row">
                {isLoggedIn && <TestimonialForm />}
                <div className="mt-4 text-center">
                    <span> </span>
                    <button className="btn btn-danger">
                        <Link className="fontcolor" to="/">
                            Back to Home
                        </Link>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Testimonials
