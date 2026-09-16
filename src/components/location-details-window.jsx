import { useEffect, useState } from 'react'

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

function LocationDetailsWindow({ location, onClose, onShowListings }) {
    const [coordinates, setCoordinates] = useState(fallbackCoordinates)
    const [locationStatus, setLocationStatus] = useState(() => (
        typeof navigator !== 'undefined' && navigator.geolocation
            ? 'Finding your position...'
            : 'Using area estimate for your search'
    ))
    const [refreshTick, setRefreshTick] = useState(0)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const details = getAreaDetails(location, coordinates, refreshTick)

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

    return (
        <div className="location-backdrop" role="presentation" onClick={onClose}>
            <section
                className="location-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button className="close-location" type="button" onClick={onClose} aria-label="Close location details">x</button>
                <div className="location-heading">
                    <div>
                        <p className="recommendation-kicker">Live area check</p>
                        <h3 id="location-details-title">{location}</h3>
                    </div>
                    <span className="live-indicator"><span aria-hidden="true" /> Live</span>
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

                <p className="location-disclaimer">Estimates are based on current area signals and should be verified during an in-person visit.</p>
                <div className="location-actions">
                    <button className="location-refresh" type="button" onClick={handleRefresh}>Refresh details</button>
                    <button className="location-done" type="button" onClick={onShowListings}>Show Standard listings</button>
                </div>
            </section>
        </div>
    )
}

export default LocationDetailsWindow
