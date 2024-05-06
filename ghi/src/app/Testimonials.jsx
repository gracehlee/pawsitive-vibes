import { baseUrl } from '../services/authService';
import { useEffect, useState } from 'react';
import '../css/Testimonials.css'
import TestimonialForm from '../components/TestimonialsForm';
import useAuthService from '../hooks/useAuthService';
import { useNavigate } from 'react-router-dom';

function Testimonials(props) {
    const { user } = useAuthService();
    const [ admin, setAdmin ] = useState(false);
    const navigate = useNavigate();


    const fetchUser = async () => {
        if (user) {
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
                    setAdmin(userData.admin)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }


    const handleManageTestimonialsClick = () => {
        if (admin) {
            navigate('/testimonials/manage');
        }
    }

    useEffect(() => {
        fetchUser()
    })

    const darkmode = props.darkmode

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row">
                    <h1 className="text-center">Testimonials</h1>
                    {user && <TestimonialForm />}
                    {user && admin && (
                        <div className="mt-4 text-center">
                            <button
                                className="btn btn-custom"
                                onClick={handleManageTestimonialsClick}
                            >
                                Manage Testimonials
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Testimonials;
