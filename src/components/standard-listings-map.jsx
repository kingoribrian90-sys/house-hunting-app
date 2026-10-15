import { useEffect, useState } from 'react'
import { api } from '../api'

const houseTypeLabels = {
    single: 'Single room',
    bedsitter: 'Bedsitter',
    'one-bedroom': 'One bedroom',
    'two-bedroom': 'Two bedroom',
}

const listingAccents = ['coral', 'teal', 'gold', 'blue']

// This modal shows live listings returned by the server for the selected area.
function StandardListingsMap({ location, locality, budget, recommendations, onSelectListing, onClose }) {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let active = true
        const query = new URLSearchParams({ county: location, locality, limit: '100' })

        api.get(`/v1/listings?${query}`)
            .then((response) => {
                if (!Array.isArray(response.data)) {
                    throw new Error('The listings API returned an invalid response.')
                }
                if (active) {
                    setListings(response.data.map((listing, index) => {
                        const type = houseTypeLabels[listing.housetype] || listing.housetype
                        const area = listing.locality
                        return {
                            ...listing,
                            id: listing.id || listing._id,
                            title: `${type} in ${area}`,
                            area,
                            type,
                            price: Number(listing.monthlybudget),
                            accent: listingAccents[index % listingAccents.length],
                        }
                    }))
                }
            })
            .catch((error) => {
                if (active) {
                    setErrorMessage(error.message)
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [location, locality])

    const listingsWithinBudget = listings
        .filter((listing) => listing.price <= budget)
        .sort((first, second) => first.price - second.price)
    const minimumRentListing = listings.slice().sort((first, second) => first.price - second.price)[0]
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${locality}, ${location}, Kenya`)}&output=embed`
    const citationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${locality}, ${location}, Kenya`)}`

    return (
        <div className="listings-backdrop" role="presentation" onClick={onClose}>
            <section className="listings-window" role="dialog" aria-modal="true" aria-labelledby="standard-listings-title" onClick={(event) => event.stopPropagation()}>
                <button className="close-listings" type="button" onClick={onClose} aria-label="Close standard listings">x</button>
                <div className="listings-heading">
                    <div>
                        <p className="recommendation-kicker">Standard listings</p>
                        <h3 id="standard-listings-title">Homes around {locality}</h3>
                        <p>Browse available homes by location and price.</p>
                        {minimumRentListing && (
                            <p className="minimum-rent-callout">
                                Minimum listed rent: <strong>KSh {minimumRentListing.price.toLocaleString()}</strong> for a {minimumRentListing.type} in {minimumRentListing.area}.
                                <a href={citationUrl} target="_blank" rel="noreferrer">Cite this area in Google Maps</a>
                            </p>
                        )}
                        {recommendations.length > 0 && <p className="listings-market-note">Market guide: {recommendations.filter((recommendation) => recommendation.fitsBudget).length} neighborhood/type matches at this budget.</p>}
                    </div>
                    <span className="listing-count">{listingsWithinBudget.length} homes under KSh {budget.toLocaleString()}</span>
                </div>
                <div className="listings-layout">
                    <div className="listing-map">
                        <iframe
                            title={`Google Maps showing ${locality}, ${location}`}
                            src={mapUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <p className="listing-map-locality">{locality}, {location}</p>
                    </div>
                    <div className="listing-results">
                        <div className="listing-results-header"><strong>Nearby homes</strong><span>Sorted by rent</span></div>
                        {loading ? (
                            <p className="no-listings" role="status">Loading listings…</p>
                        ) : errorMessage ? (
                            <p className="form-error" role="alert">{errorMessage}</p>
                        ) : listingsWithinBudget.length > 0 ? (
                            listingsWithinBudget.map((listing) => (
                                <article className="listing-card" key={listing.id}>
                                    <div className={`listing-thumb ${listing.accent}`} aria-hidden="true"><span>{listing.type}</span></div>
                                    <div>
                                        <h4>{listing.title}</h4>
                                        <p>{listing.area} · {listing.type}</p>
                                        <strong>KSh {listing.price.toLocaleString()}<small> / month</small></strong>
                                        <button className="specific-property-button" type="button" onClick={() => onSelectListing(listing)}>Specific Property</button>
                                    </div>
                                </article>
                            ))
                        ) : listings.length > 0 ? (
                            <p className="no-listings">No homes in {locality} are under KSh {budget.toLocaleString()}. Increase your budget to see these listings.</p>
                        ) : (
                            <p className="no-listings">No listings are available for {locality} yet.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StandardListingsMap
