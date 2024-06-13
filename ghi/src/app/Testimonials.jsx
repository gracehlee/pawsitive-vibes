import '../css/Testimonials.css'
import TestimonialForm from '../components/CreateTestimonialsForm'
import useAuthService from '../hooks/useAuthService'
import { Link } from 'react-router-dom'

function Testimonials(props) {
    const { isLoggedIn } = useAuthService()
    const darkmode = props.darkmode

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="row">
                {isLoggedIn && <TestimonialForm darkmode={darkmode} />}
                <div className="mt-4 text-center">
                    <span> </span>
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
                </div>
            </div>
        </main>
    )
}

export default Testimonials
