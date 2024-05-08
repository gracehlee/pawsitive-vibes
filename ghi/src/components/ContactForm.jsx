import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'
import emailjs from '@emailjs/browser'
import { PUBLIC_KEY, TEMPLATE_ID, SERVICE_ID, PV_EMAIL } from '../../config'

function ContactForm() {
    const { error, user, isLoggedIn } = useAuthService()
    const [userData, setUserData] = useState({ name: '', email: '' })
    const [contactFormData, setContactFormData] = useState({
        from_name: '',
        user_email: '',
        message: '',
    })

    const [userError, setUserError] = useState('')
    const [userSuccess, setUserSuccess] = useState('')

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUser = async () => {
                const user_id = user.id
                const userUrl = `${baseUrl}/api/users/${user_id}`
                try {
                    const response = await fetch(userUrl, {
                        method: 'get',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (response.ok) {
                        const userData = await response.json()
                        setUserData({
                            name: `${userData.first_name} ${userData.last_name}`,
                            email: userData.email,
                        })
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            fetchUser()
        } else {
            setUserData({ name: '', email: '' }) // reset with logout
        }
    }, [isLoggedIn, user])

    useEffect(() => {
        setContactFormData({
            ...contactFormData,
            from_name: userData.name,
            user_email: userData.email,
            message: contactFormData.message,
        })
    }, [userData]) // update with user input

    const handleInputChange = (event) => {
        setContactFormData({
            ...contactFormData,
            [event.target.name]: event.target.value,
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const sendEmail = (e) => {
        e.preventDefault()
        setUserSuccess('')
        setUserError('')

        // checks if valid email and not our own email
        if (
            !validateEmail(contactFormData.user_email) ||
            contactFormData.user_email.toLowerCase() === PV_EMAIL
        ) {
            setUserError('Please enter a valid email address.')
            return
        }
        emailjs.send(SERVICE_ID, TEMPLATE_ID, contactFormData, PUBLIC_KEY).then(
            () => {
                setUserSuccess('Email sent successfully!')
                setContactFormData({
                    from_name: userData.name,
                    user_email: userData.email,
                    message: 'Message',
                })
            },
            (error) => {
                setUserError('Failed to send email: ' + error.text)
            }
        )
    }

    return (
        <div className="contact-form">
            <div className="offset-3 col-6">
                <h1 className="card-title text-center">Contact Us</h1>
                <br />
                {userError && (
                    <div className="alert alert-danger">{userError}</div>
                )}
                {userSuccess && (
                    <div className="alert alert-success">{userSuccess}</div>
                )}
                <form
                    className="contact-form"
                    id="contact-form"
                    onSubmit={sendEmail}
                >
                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input
                            required
                            type="text"
                            value={contactFormData.from_name}
                            name="from_name"
                            onChange={handleInputChange}
                            className="form-control placeholder fontcolor"
                            placeholder="Name"
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            value={contactFormData.user_email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                            type="text"
                            name="user_email"
                            id="email"
                            className="form-control placeholder fontcolor"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            value={contactFormData.message}
                            onChange={handleInputChange}
                            placeholder="Message"
                            required
                            type="text"
                            name="message"
                            id="message"
                            className="form-control placeholder fontcolor"
                        />
                        <label htmlFor="message">Message</label>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ background: 'green' }}
                        >
                            Submit
                        </button>
                    </div>
                    <br></br>
                </form>
            </div>
        </div>
    )
}

export default ContactForm
