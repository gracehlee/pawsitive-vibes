import { useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'
import '../css/ImageCarousel.css'
import image1 from '../images/imagecarousel/care.png'
import image2 from '../images/imagecarousel/clients.png'
import image3 from '../images/imagecarousel/collie_2.png'
import image4 from '../images/imagecarousel/collie.png'
import image5 from '../images/imagecarousel/darcy.png'
import image6 from '../images/imagecarousel/Dog_Walker.png'
import image7 from '../images/imagecarousel/Owner.png'
import image8 from '../images/imagecarousel/sally.png'
import image9 from '../images/imagecarousel/Terrier.png'
import image10 from '../images/imagecarousel/Vizsla_Dogs.png'
import image11 from '../images/imagecarousel/Walking.png'

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

function ImageCarousel({ darkmode }) {
    const [index, setIndex] = useState(0)
    const [modalShow, setModalShow] = useState(false)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    const handleOpenModal = (selectedIndex) => {
        setIndex(selectedIndex)
        setModalShow(true)
    }

    const handleCloseModal = () => {
        setModalShow(false)
    }

    return (
        <div
            className={`image-carousel-container ${darkmode ? 'darkmode' : ''}`}
        >
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={3000}
                controls={false}
                indicators={false}
                fade
            >
                {images.map((image, idx) => (
                    <Carousel.Item key={idx}>
                        <img
                            className="carousel-image"
                            src={image}
                            alt={`Slide ${idx + 1}`}
                            onClick={() => handleOpenModal(idx)}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Modal
                show={modalShow}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Image Gallery
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        className="modal-image"
                        src={images[index]}
                        alt={`Slide ${index + 1}`}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ImageCarousel
