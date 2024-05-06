import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import useAuthService from '../hooks/useAuthService'
import d2 from '../images/assets/d2.png'

function Community(props) {
    const { isLoggedIn } = useAuthService()
    const darkmode = props.darkmode

    return (
        <main
            className={`c${darkmode ? ' darkmode' : ''}`}
            style={{ paddingTop: '15vh' }}
        >
            {isLoggedIn && (
                <div className="c-row">
                    <div className="d-flex align-items-center">
                        <img
                            src={d2}
                            alt="community"
                            className="community-image"
                            style={{
                                marginRight: '3vw',
                                borderRadius: '1vw',
                                width: '80%',
                                marginBottom: '2rem',
                            }}
                        />
                        <div>
                            <h2>Welcome to our</h2>
                            <h3>Pawsitive Community!</h3>
                            <p>
                                At Pawsitive Vibes, we believe in fostering
                                connections, celebrating diversity, and creating
                                a safe space for all pet enthusiasts. Whether
                                you&apos;re a seasoned pet owner or considering
                                bringing a furry friend into your life,
                                you&apos;ve come to the right place.
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                What you can do:
                            </p>
                            <ul>
                                <li>Update Your Profile</li>
                                <li>Add Your Pets</li>
                                <li>Join Community Meet-ups</li>
                            </ul>
                            <p>
                                Join us today and become a part of our growing
                                family of pet lovers! Together, we can make a
                                difference in the lives of animals and build
                                lasting friendships along the way.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Community
