import 'bootstrap/dist/css/bootstrap.css'
import logo from '../images/PV_Logo.png'

function Home() {
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center">
                        <img
                            src={logo}
                            alt="Pawsitive Vibes Logo"
                            style={{ height: '300px', width: '520px' }}
                        />
                        <h1>Welcome to Pawsitive Vibes!</h1>
                        <h3>Experienced. Force Free. Passionate. </h3>
                        <br></br>
                        <br></br>
                        <p>
                            Cat and Dog CPR, Human CPR, Dog Play group, and Fear
                            free certified. Pending AKC certified trainer and a
                            CCDPT-KA.
                            <br></br>
                            <br></br>
                            Pawsitive Vibes Dog Training LLC was founded in June
                            of 2022 because it is never too late to teach an old
                            pet new behaviors. Our tailor-made services are
                            designed with you and your pet in mind to ensure
                            results in a force/fear free manner. We believe in
                            working as much with you as with your pet. Our high
                            success rates and client satisfaction is our
                            greatest source of pride!
                            <br></br>
                            <br></br>A list of offered services can be seen on
                            our Services page, and logged in users may request
                            service appointments. If you don&apos;t wish to make
                            a (free) account with us, a &quot;Contact Us&quot;
                            form is located at the bottom of each page for your
                            convenience. Feel free to ask specific questions and
                            create appointments!
                        </p>
                        <p>This is where photos will go</p>
                        <p>This is where the Testimonials list will go</p>
                        <p>
                            For admins, this is where the toggle for Create
                            Testimonials will go.
                        </p>
                        <p>This is where photos will go</p>
                        <p>This is where the Testimonials list will go</p>
                        <p>
                            For admins, this is where the toggle for Create
                            Testimonials will go.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home
