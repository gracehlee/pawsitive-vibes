import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import '../css/ServiceList.css'



export default function ServiceList() {
    const [services, setServices] = useState([]);

    const fetchData = async () => {
        try {
            const url = `${baseUrl}/api/services`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setServices(data) 
            } else {
                console.error('Error fetching services:', res.statusText)
            }
        } catch (error) {
            console.error('Error fetching services:', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold">Services</h1>
            <div className="col-lg-6 mx-auto"></div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Image</th>
                        <th>Duration</th>
                        <th>Cost</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => {
                        return (
                            <tr key={service.service}>
                                <td>{service.service}</td>
                                <td className="w-25">
                                    <img
                                        src={service.picture_url}
                                        className="img-fluid img-thumbnail"
                                        alt="Service"
                                    ></img>
                                </td>
                                <td>{service.duration}</td>
                                <td>{service.cost}</td>
                                <td>{service.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}