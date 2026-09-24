function PropertyDetailsWindow({ property, onClose, onNotInterested }) {
    const rent = property.budget
    const deposit = rent
    const serviceCharge = 2500
    const water = 500
    const electricity = 'Pay as you use'

    return (
        <div className="details-backdrop" role="presentation">
            <section className="details-window" role="dialog" aria-modal="true" aria-labelledby="property-details-title">
                <button className="close-details" type="button" onClick={onClose} aria-label="Close property details">x</button>
                <div className="details-heading">
                    <img src={property.photo} alt={`${property.type} home`} />
                    <div>
                        <p className="recommendation-kicker">Home details</p>
                        <h3 id="property-details-title">{property.type} in {property.location || 'your preferred area'}</h3>
                        <p>A comfortable home ready for its next tenant.</p>
                    </div>
                </div>

                <div className="details-section">
                    <h4>About this home</h4>
                    <p>Bright, secure and close to shops, public transport and everyday services.</p>
                    <p><strong>House owner:</strong> Mary Wanjiku</p>
                    <p><strong>Phone:</strong> <a href="tel:+254712345678">+254 712 345 678</a></p>
                    <p><strong>Email:</strong> <a href="mailto:mary@example.com">mary@example.com</a></p>
                </div>

                <div className="details-section">
                    <h4>Where it is</h4>
                    <a
                        className="property-address"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.location || 'Nairobi'}, Kenya`)}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {property.location || 'Nairobi'}, Kenya - open the address in Maps
                    </a>
                </div>

                <div className="cost-breakdown">
                    <div className="details-section">
                        <h4>Rent and move-in costs</h4>
                        <p><span>Monthly rent</span><strong>KSh {rent.toLocaleString()}</strong></p>
                        <p><span>Refundable deposit</span><strong>KSh {deposit.toLocaleString()}</strong></p>
                        <p><span>Move-in total</span><strong>KSh {(rent + deposit).toLocaleString()}</strong></p>
                    </div>
                    <div className="details-section">
                        <h4>Utilities</h4>
                        <p><span>Service charge</span><strong>KSh {serviceCharge.toLocaleString()}</strong></p>
                        <p><span>Water</span><strong>KSh {water.toLocaleString()}</strong></p>
                        <p><span>Electricity</span><strong>{electricity}</strong></p>
                    </div>
                </div>

                <div className="details-actions">
                    <p>Would you like to rent this home?</p>
                    <div>
                        <button type="button" onClick={onClose}>Yes, I’m interested</button>
                        <button className="secondary-action" type="button" onClick={onNotInterested}>Not for me</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PropertyDetailsWindow
