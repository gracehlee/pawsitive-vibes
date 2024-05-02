import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import FB_Logo from '../images/FB_Logo.png'
import IG_Logo from '../images/IG_Logo.png'
import email from '../images/email.png'
import ContactForm from '../components/ContactForm'
import { useState } from 'react'

export default function Footer() {
    const [form, setForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)

    const handleOpenForm = () => {
        setForm(true)
        setCloseForm(false)
    }
    const handleCloseForm = () => {
        setForm(false)
        setCloseForm(true)
    }
    const handleCopy = () => {
        const my_email = 'PawsitiveVibesColorado@Gmail.com'
        navigator.clipboard.writeText(my_email)
        window.alert('Email copied to clipboard!')
    }

    return (
        <footer className="footer mt-auto py-3 text-white bottom">
            <div className="text-center">
                <br></br>
                <h3>Contact Us</h3>
            </div>
            <br></br>
            <div className="text-center">
                <a href="https://www.facebook.com/people/Pawsitive-Vibes-Dog-Training-LLC/100083097112386/">
                    <img src={FB_Logo} height="30" />
                </a>
                <span> </span>
                <a href="https://www.instagram.com/pawsitive_vibes_dt/">
                    <img src={IG_Logo} height="30" />
                </a>
                <span> </span>
                <img
                    src={email}
                    height="30"
                    alt="Email"
                    onClick={handleCopy}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <br></br>
            <div className="text-center">
                <p>PawsitiveVibesColorado@Gmail.com</p>
            </div>
            <br></br>
            {form && (
                <div className="text-center">
                    <ContactForm />
                </div>
            )}
            {closeForm && (
                <div className="text-center">
                    <button className="btn btn-danger" onClick={handleOpenForm}>
                        Contact Us
                    </button>
                </div>
            )}
            {form && (
                <div className="text-center">
                    <button
                        className="btn btn-secondary"
                        onClick={handleCloseForm}
                    >
                        Close Form
                    </button>
                </div>
            )}
        </footer>
    )
}
