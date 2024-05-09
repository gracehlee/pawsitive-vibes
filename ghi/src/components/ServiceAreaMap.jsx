import GoogleMapReact from 'google-map-react'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const ServiceAreaMap = () => {
    const defaultProps = {
        center: {
            lat: 38.9422556,
            lng: -105.1576396,
        },
        zoom: 9,
    }

    return (
        <div
            style={{
                height: '400px',
                width: '100%',
                marginTop: '50px',
                paddingLeft: '20vw',
                paddingRight: '20vw',
            }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
        </div>
    )
}

export default ServiceAreaMap
