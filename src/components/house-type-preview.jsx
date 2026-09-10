import singleRoomCompound from '../assets/single-room-compound.jpeg'
import singleRoomInside from '../assets/single-room-inside.jpeg'
import singleRoomOutside from '../assets/single-room-outside.jpeg'
import bedsitterCompound from '../assets/bedsitter-compound.jpg'
import bedsitterInside from '../assets/bedsitter-inside.jpeg'
import bedsitterIn from '../assets/bedsitter-in.jpeg'
import bedsitterOutside from '../assets/bedsitter-outside.jpeg'
import oneBedroomInside from '../assets/onebedroom-inside.jpg'
import oneBedroomIn from '../assets/one-bedroom-in.jpeg'
import twoBedroomIn from '../assets/two-bedroom-in.jpeg'
import twoBedroomIn2 from '../assets/two-bedroom-in2.jpeg'
import twoBedroomIn3 from '../assets/two-bedroom-in3.jpeg'
import twoBedroomInside from '../assets/two-bedroom-inside.jpeg'

const houseTypePhotos = {
    single: {
        label: 'Single room',
        photos: [singleRoomCompound, singleRoomInside, singleRoomOutside],
    },
    bedsitter: {
        label: 'Bedsitter',
        photos: [bedsitterCompound, bedsitterInside, bedsitterIn, bedsitterOutside],
    },
    'one-bedroom': {
        label: 'One bedroom',
        photos: [oneBedroomIn, oneBedroomInside],
    },
    'two-bedroom': {
        label: 'Two bedroom',
        photos: [twoBedroomIn, twoBedroomIn2, twoBedroomIn3, twoBedroomInside],
    },
}

function HouseTypePreview({ houseType, houseTypes, onClose, onContinue }) {
    const selectedHouseTypes = houseTypes || [houseType]

    return (
        <div className="preview-backdrop" role="presentation" onClick={onClose}>
            <section
                className="preview-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="preview-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button className="close-preview" type="button" onClick={onClose} aria-label="Close house photo preview">x</button>
                <p className="recommendation-kicker">House type selected</p>
                <h3 id="preview-title">Sample homes</h3>
                <p className="preview-description">Here are sample homes matching your selection.</p>
                {selectedHouseTypes.map((type) => {
                    const selection = houseTypePhotos[type]

                    return (
                        <div className="preview-selection" key={type}>
                            <h4>{selection.label}</h4>
                            <div className="preview-gallery">
                                {selection.photos.map((photo, index) => (
                                    <img key={photo} src={photo} alt={`${selection.label} sample ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                    )
                })}
                <button className="preview-done" type="button" onClick={onContinue || onClose}>Continue</button>
            </section>
        </div>
    )
}

export default HouseTypePreview