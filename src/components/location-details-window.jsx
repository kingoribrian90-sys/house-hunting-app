import { useEffect, useState } from 'react'
import { getRentEstimate } from '../rental-market'
import { UtilityPaymentBreakdown } from './tenants-payment-window'

const fallbackCoordinates = { latitude: -1.286389, longitude: 36.817223 }

function hashLocation(location, latitude, longitude) {
    return Math.abs(
        [...`${location.toLowerCase()}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`].reduce(
            (total, character) => (total * 31 + character.charCodeAt(0)) % 100000,
            7,
        ),
    )
}

function getAreaDetails(location, coordinates, refreshTick) {
    const seed = hashLocation(location || 'Nairobi', coordinates.latitude, coordinates.longitude) + refreshTick
    const trafficNoise = 38 + (seed % 25)
    const busyRoadDistance = 0.4 + ((seed * 7) % 18) / 10
    const greenSpaceRatio = 12 + ((seed * 11) % 39)
    const floodRisk = ['Low', 'Low', 'Moderate', 'Moderate', 'Elevated'][seed % 5]
    const floodRiskClass = floodRisk.toLowerCase()

    return [
        {
            label: 'Traffic noise',
            value: `${trafficNoise} dB`,
            detail: trafficNoise < 48 ? 'Quiet for an urban area' : 'Busier during peak hours',
            icon: 'sound',
        },
        {
            label: 'Busy road proximity',
            value: `${busyRoadDistance.toFixed(1)} km`,
            detail: busyRoadDistance < 1 ? 'Main road nearby' : 'Set back from major roads',
            icon: 'road',
        },
        {
            label: 'Green space ratio',
            value: `${greenSpaceRatio}%`,
            detail: greenSpaceRatio > 30 ? 'Good access to open space' : 'Limited open space nearby',
            icon: 'leaf',
        },
        {
            label: 'Flood risk zone',
            value: floodRisk,
            detail: floodRisk === 'Low' ? 'Lower exposure expected' : 'Check drainage and elevation',
            icon: 'water',
            status: floodRiskClass,
        },
    ]
}

function getLocalDateTimeValue(date) {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return localDate.toISOString().slice(0, 16)
}

function LocationDetailsWindow({ listing, onClose, onBackToMap }) {
    const location = listing.area
    const rentEstimate = getRentEstimate(listing.county, listing.area, listing.type)
    const estimatedRent = rentEstimate
        ? Math.round((rentEstimate.minimum + rentEstimate.maximum) / 2)
        : listing.price
    const estimatedDeposit = estimatedRent
    const utilityBase = estimatedRent
    const utilities = [
        { label: 'Water', amount: Math.max(400, Math.round(utilityBase * 0.025)), detail: 'Monthly usage estimate; billing mode not provided' },
        { label: 'Electricity', amount: Math.max(800, Math.round(utilityBase * 0.07)), detail: 'Monthly usage estimate; billing mode not provided' },
        { label: 'Garbage collection', amount: 300, detail: 'Typical monthly area estimate' },
        { label: 'Sewer and drainage', amount: 400, detail: 'Typical monthly area estimate' },
        { label: 'Internet (optional)', amount: 2500, detail: 'Optional monthly plan estimate' },
    ]
    const [coordinates, setCoordinates] = useState(fallbackCoordinates)
    const [locationStatus, setLocationStatus] = useState(() => (
        typeof navigator !== 'undefined' && navigator.geolocation
            ? 'Finding your position...'
            : 'Using area estimate for your search'
    ))
    const [refreshTick, setRefreshTick] = useState(0)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [activeTab, setActiveTab] = useState('overview')
    const [tourRequested, setTourRequested] = useState(false)
    const [tourDetails, setTourDetails] = useState(null)
    const details = getAreaDetails(location, coordinates, refreshTick)
    const address = listing.address || `${listing.area}, ${listing.county}, Kenya`
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

    useEffect(() => {
        if (!navigator.geolocation) {
            return undefined
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                setLocationStatus('Using your current position')
            },
            () => setLocationStatus('Using area estimate for your search'),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 },
        )

        return undefined
    }, [])

    useEffect(() => {
        const refreshTimer = window.setInterval(() => {
            setRefreshTick((tick) => tick + 1)
            setLastUpdated(new Date())
        }, 30000)

        return () => window.clearInterval(refreshTimer)
    }, [])

    function handleRefresh() {
        setRefreshTick((tick) => tick + 1)
        setLastUpdated(new Date())
    }

    function handleTourRequest(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setTourDetails({
            email: formData.get('tour-email'),
            dateTime: formData.get('tour-datetime'),
        })
        setTourRequested(true)
    }

    function renderDetailsPanel() {
        if (activeTab === 'location') {
            return (
                <div className="property-address-panel">
                    <strong>Location address</strong>
                    <p>{address}</p>
                    {!listing.address && <p className="utility-estimate-note">Exact street address is not available in this sample listing.</p>}
                    <a href={mapUrl} target="_blank" rel="noreferrer">Open this location in Google Maps</a>
                    <div className="property-address-map">
                        <iframe title={`Map of ${address}`} src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                    <p className="location-status" role="status">{locationStatus} · Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <div className="location-metrics">
                        {details.map((detail) => (
                            <article className={`location-metric${detail.status ? ` ${detail.status}` : ''}`} key={detail.label}>
                                <span className={`metric-icon ${detail.icon}`} aria-hidden="true" />
                                <p>{detail.label}</p>
                                <strong>{detail.value}</strong>
                                <small>{detail.detail}</small>
                            </article>
                        ))}
                    </div>
                    <button className="text-button" type="button" onClick={handleRefresh}>Refresh area details</button>
                </div>
            )
        }

        if (activeTab === 'costs') {
            return (
                <div className="cost-breakdown">
                    <div><span>Listed monthly rent</span><strong>KSh {listing.price.toLocaleString()}</strong></div>
                    {rentEstimate && <div><span>Market-estimated monthly rent</span><strong>KSh {rentEstimate.minimum.toLocaleString()} - {rentEstimate.maximum.toLocaleString()}</strong></div>}
                    <div><span>Estimated refundable deposit</span><strong>KSh {estimatedDeposit.toLocaleString()}</strong></div>
                    <div className="cost-total"><span>Estimated move-in total</span><strong>KSh {(listing.price + estimatedDeposit).toLocaleString()}</strong></div>
                    <p>Deposit is estimated at one month of the market-estimated rent. Confirm the amount and refund terms with the owner.</p>
                </div>
            )
        }

        if (activeTab === 'utilities') {
            return <UtilityPaymentBreakdown location={listing.area} utilities={utilities} />
        }

        return (
            <div className="property-overview-grid">
                <section>
                    <h4>Property</h4>
                    <p><strong>Type:</strong> {listing.propertyType || (listing.type.includes('bedroom') ? 'Apartment' : 'Home')}</p>
                    <p><strong>Layout:</strong> {listing.type}</p>
                    <p><strong>County:</strong> {listing.county}</p>
                </section>
                <section>
                    <h4>House owner</h4>
                    <p><strong>Listed by:</strong> {listing.ownerName || 'Property owner'}</p>
                    <p>{listing.ownerInfo || 'Owner profile details are not available in this sample listing.'}</p>
                </section>
                <section>
                    <h4>Owner contact</h4>
                    <p>{listing.ownerContact || 'Contact details are shared after the owner responds to a tour request.'}</p>
                </section>
                <section>
                    <h4>Agent contact</h4>
                    <p>{listing.agentContact || 'No agent is assigned to this listing.'}</p>
                </section>
            </div>
        )
    }

    return (
        <div className="location-backdrop property-details-backdrop" role="presentation" onClick={onClose}>
            <section
                className="location-window property-details-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button className="close-location" type="button" onClick={onClose} aria-label="Close location details">x</button>
                <div className="location-heading">
                    <div>
                        <p className="recommendation-kicker">{tourRequested ? 'Virtual tour request' : 'Specific property'}</p>
                        <h3 id="location-details-title">{listing.title}</h3>
                        <p className="property-subtitle">{listing.area} · {listing.county} · {listing.type}</p>
                        <strong className="property-price">KSh {listing.price.toLocaleString()} / month</strong>
                    </div>
                    <span className="live-indicator">Market estimate</span>
                </div>
                {tourRequested ? (
                    tourDetails ? (
                        <div className="tour-confirmation" role="status">
                            <strong>Virtual tour requested</strong>
                            <p>{new Date(tourDetails.dateTime).toLocaleString()} · Confirmation for {tourDetails.email}</p>
                            <p>This demo records the request locally; no owner notification has been sent.</p>
                            <button className="text-button" type="button" onClick={() => { setTourRequested(false); setTourDetails(null) }}>Back to property details</button>
                        </div>
                    ) : (
                        <form className="virtual-tour-form" onSubmit={handleTourRequest}>
                            <h4>Request a virtual tour</h4>
                            <p>Choose a preferred time. The owner can confirm the final slot.</p>
                            <label htmlFor="tour-email">Email for confirmation</label>
                            <input id="tour-email" name="tour-email" type="email" placeholder="you@example.com" required />
                            <label htmlFor="tour-datetime">Preferred date and time</label>
                            <input id="tour-datetime" name="tour-datetime" type="datetime-local" min={getLocalDateTimeValue(new Date())} required />
                            <div className="property-decision">
                                <button type="button" onClick={() => setTourRequested(false)}>Back</button>
                                <button type="submit">Send virtual tour request</button>
                            </div>
                        </form>
                    )
                ) : (
                    <>
                        <div className="property-detail-tabs" role="tablist" aria-label="Property details">
                            {[
                                ['overview', 'Overview'],
                                ['location', 'Location'],
                                ['costs', 'Rent & deposit'],
                                ['utilities', 'Utilities'],
                            ].map(([tab, label]) => (
                                <button id={`property-tab-${tab}`} key={tab} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="property-panel" className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{label}</button>
                            ))}
                        </div>
                        <div className="property-detail-panel" id="property-panel" role="tabpanel" aria-labelledby={`property-tab-${activeTab}`}>
                            {renderDetailsPanel()}
                        </div>
                        <div className="property-decision">
                            <button type="button" onClick={onBackToMap}>Not interested</button>
                            <button type="button" onClick={() => setTourRequested(true)}>Interested? Request virtual tour</button>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default LocationDetailsWindow
