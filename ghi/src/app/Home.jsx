import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import logo from '../images/PV_Logo.png'
import badge from '../images/assets/d1.png'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import ImageCarousel from '../components/ImageCarousel'
import useAuthService from '../hooks/useAuthService'
import ServiceAreaMap from '../components/ServiceAreaMap'
import { Link } from 'react-router-dom'

function Home(props) {
    const darkmode = props.darkmode
    const admin = props.admin
    const { isLoggedIn } = useAuthService()
    const INSTAGRAM_API = import.meta.env.VITE_SNAPWIDGET

    return (
        <main className={`${darkmode ? 'darkmode' : ''}`}>
            <div className="text-center">
                <img
                    src={logo}
                    alt="Pawsitive Vibes Logo"
                    style={{ height: 'auto', width: '40vw' }}
                />
                <h1>Welcome to Pawsitive Vibes!</h1>
                <h3>Experienced. Force Free. Passionate.</h3>
                <br />
                <div className="col-md-8 offset-md-2 text-center home-content">
                    <p>
                        Cat and Dog CPR, Human CPR, Dog Play group, and Fear
                        free certified.<br></br>Pending AKC certified trainer
                        and a CCDPT-KA.
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        Pawsitive Vibes Dog Training LLC was founded in June of
                        2022 because it is never too late to teach an old pet
                        new behaviors. Our tailor-made services are designed
                        with you and your pet in mind to ensure results in a
                        force/fear free manner. We believe in working as much
                        with you as with your pet. Our high success rates and
                        client satisfaction is our greatest source of pride!
                        <br />
                        <br />A list of offered services can be seen on our
                        Services page, and logged in users may request service
                        appointments. If you don&apos;t wish to make a (free)
                        account with us, a &quot;Contact Us&quot; form is
                        located at the bottom of each page for your convenience.
                        Feel free to ask specific questions and create
                        appointments!
                    </p>
                    <br />
                </div>
            </div>
            <h3
                className={`text-center testimonial-header${
                    darkmode ? ' fontcolor' : ''
                }`}
            ></h3>
            <div className="text-center" id="home-carousel">
                <div className="d-flex">
                    <div>
                        <ImageCarousel darkmode={darkmode} />
                    </div>
                    <div name="testimonial" style={{ width: '600px' }}>
                        <TestimonialsCarousel darkmode={darkmode} />
                    </div>
                </div>
                <br />
                {isLoggedIn && (
                    <p>
                        <Link to="/testimonials">
                            <button
                                className="btn btn-primary"
                                style={{
                                    background: darkmode ? 'black' : 'green',
                                    color: darkmode ? 'white' : '',
                                }}
                            >
                                Submit A Testimonial!
                            </button>
                        </Link>
                    </p>
                )}
                <div>
                    <br />
                    <br />
                    <h1>My Instagram Updates</h1>
                    <br /> <br />
                    <iframe
                        src={INSTAGRAM_API}
                        className="snapwidget-widget"
                        frameBorder="0"
                        scrolling="no"
                        style={{
                            border: 'none',
                            overflow: 'hidden',
                            width: '765px',
                            height: '510px',
                        }}
                        title="Posts from Instagram"
                    ></iframe>
                </div>
                <br />
                <br />
                {isLoggedIn && admin && (
                    <p>
                        <Link to="/testimonials/manage">
                            <button
                                className="btn btn-primary"
                                style={{ background: 'green' }}
                            >
                                Manage Testimonials
                            </button>
                        </Link>
                    </p>
                )}
                <br />
                <Link to="https://karenpryoracademy.com/">
                    <img
                        src={badge}
                        alt="Karen Pryor Academy Badge"
                        style={{ height: 'auto', width: '150px' }}
                    />
                </Link>
                <ServiceAreaMap />
            </div>
        </main>
    )
}

export default Home
