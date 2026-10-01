// Sample listings used to populate the map view and help the tenant browse nearby homes.
const listingCatalog = [
    { county: 'Nairobi County', title: 'Sunlit bedsitter', area: 'Kasarani', price: 18000, type: 'Bedsitter', top: '28%', left: '32%', accent: 'coral' },
    { county: 'Nairobi County', title: 'Quiet one bedroom', area: 'Roysambu', price: 32000, type: 'One bedroom', top: '44%', left: '57%', accent: 'teal' },
    { county: 'Nairobi County', title: 'Garden apartment', area: 'Embakasi', price: 25000, type: 'One bedroom', top: '67%', left: '38%', accent: 'gold' },
    { county: 'Nairobi County', title: 'Modern city view', area: 'Westlands', price: 48000, type: 'Two bedroom', top: '23%', left: '72%', accent: 'blue' },
    { county: 'Nairobi County', title: 'Freshly renovated home', area: 'Kilimani', price: 55000, type: 'Two bedroom', top: '72%', left: '73%', accent: 'coral' },
    { county: 'Mombasa County', title: 'Coastal bedsitter', area: 'Bamburi', price: 12000, type: 'Bedsitter', top: '34%', left: '37%', accent: 'teal' },
    { county: 'Mombasa County', title: 'Nyali apartment', area: 'Nyali', price: 35000, type: 'One bedroom', top: '58%', left: '68%', accent: 'blue' },
    { county: 'Kisumu County', title: 'Lakeview home', area: 'Milimani', price: 22000, type: 'One bedroom', top: '30%', left: '48%', accent: 'gold' },
    { county: 'Kisumu County', title: 'Spacious family home', area: 'Mamboleo', price: 45000, type: 'Two bedroom', top: '66%', left: '61%', accent: 'coral' },
    { county: 'Nakuru County', title: 'Town bedsitter', area: 'Nakuru Town', price: 10000, type: 'Bedsitter', top: '40%', left: '34%', accent: 'coral' },
    { county: 'Nakuru County', title: 'Milimani residence', area: 'Milimani', price: 40000, type: 'Two bedroom', top: '68%', left: '65%', accent: 'blue' },
    { county: 'Kiambu County', title: 'Ruiru starter home', area: 'Ruiru', price: 15000, type: 'Bedsitter', top: '28%', left: '43%', accent: 'teal' },
    { county: 'Kiambu County', title: 'Thika family apartment', area: 'Thika', price: 38000, type: 'Two bedroom', top: '62%', left: '72%', accent: 'gold' },
    { county: 'Uasin Gishu County', title: 'Eldoret central home', area: 'Eldoret CBD', price: 14000, type: 'Bedsitter', top: '36%', left: '46%', accent: 'coral' },
    { county: 'Uasin Gishu County', title: 'Kapsoya apartment', area: 'Kapsoya', price: 36000, type: 'Two bedroom', top: '65%', left: '62%', accent: 'blue' },
    { county: 'Machakos County', title: 'Athi River home', area: 'Athi River', price: 16000, type: 'Bedsitter', top: '35%', left: '38%', accent: 'teal' },
    { county: 'Machakos County', title: 'Machakos town apartment', area: 'Machakos Town', price: 42000, type: 'Two bedroom', top: '65%', left: '66%', accent: 'gold' },
    { county: 'Kajiado County', title: 'Kitengela starter home', area: 'Kitengela', price: 13000, type: 'Bedsitter', top: '32%', left: '42%', accent: 'coral' },
    { county: 'Kajiado County', title: 'Ngong family home', area: 'Ngong', price: 44000, type: 'Two bedroom', top: '68%', left: '64%', accent: 'blue' },
    { county: "Murang'a County", title: "Murang'a town bedsitter", area: "Murang'a Town", price: 9000, type: 'Bedsitter', top: '35%', left: '43%', accent: 'teal' },
    { county: "Murang'a County", title: 'Mukuyu apartment', area: 'Mukuyu', price: 28000, type: 'One bedroom', top: '63%', left: '66%', accent: 'gold' },
    { county: 'Nyeri County', title: 'Nyeri town home', area: 'Nyeri Town', price: 11000, type: 'Bedsitter', top: '32%', left: '40%', accent: 'coral' },
    { county: 'Nyeri County', title: 'Kamakwa apartment', area: 'Kamakwa', price: 30000, type: 'One bedroom', top: '66%', left: '64%', accent: 'blue' },
    { county: 'Kakamega County', title: 'Kakamega central home', area: 'Kakamega Town', price: 10000, type: 'Bedsitter', top: '36%', left: '45%', accent: 'teal' },
    { county: 'Kakamega County', title: 'Lurambi apartment', area: 'Lurambi', price: 27000, type: 'One bedroom', top: '64%', left: '62%', accent: 'gold' },
]

// This modal shows a clustered map of available homes within the selected county and locality.
function StandardListingsMap({ location, locality, budget, suggestedLocations, recommendations, onSelectListing, onClose }) {
    // Keep map results constrained to the tenant's selected locality and budget.
    const countyListings = listingCatalog.filter((listing) => listing.county === location && listing.area === locality && suggestedLocations.includes(listing.area))
    // Keep selectable map results strictly within the tenant's budget.
    const listingsWithinBudget = countyListings.filter((listing) => listing.price <= budget).sort((first, second) => first.price - second.price)
    const minimumRentListing = countyListings.slice().sort((first, second) => first.price - second.price)[0]
    const listings = listingsWithinBudget
    const minimumRentMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${locality}, ${location}, Kenya`)}&output=embed`
    const minimumRentCitationUrl = minimumRentListing
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${minimumRentListing.area}, ${location}, Kenya`)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location}, Kenya`)}`

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
                                <a href={minimumRentCitationUrl} target="_blank" rel="noreferrer">Cite this area in Google Maps</a>
                            </p>
                        )}
                        {recommendations.length > 0 && <p className="listings-market-note">Market guide: {recommendations.filter((recommendation) => recommendation.fitsBudget).length} neighborhood/type matches at this budget.</p>}
                    </div>
                    <span className="listing-count">{listingsWithinBudget.length} homes under KSh {budget.toLocaleString()}</span>
                </div>
                {/* Pair the embedded map with the matching listing results. */}
                <div className="listings-layout">
                    <div className="listing-map">
                        <iframe
                            title={`Google Maps showing the minimum rent listing in ${minimumRentListing?.area || location}`}
                            src={minimumRentMapUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="listing-map-pins" aria-label="Properties on the map">
                            {listings.map((listing, index) => (
                                <button
                                    className="listing-map-pin"
                                    key={listing.title}
                                    style={{ top: listing.top, left: listing.left }}
                                    type="button"
                                    aria-label={`Show ${listing.title}`}
                                    onClick={() => onSelectListing(listing)}
                                >
                                    <span aria-hidden="true">{index + 1}</span>
                                </button>
                            ))}
                        </div>
                        <p className="listing-map-locality">{locality}, {location}</p>
                    </div>
                    <div className="listing-results">
                        <div className="listing-results-header"><strong>Nearby homes</strong><span>Sorted by match</span></div>
                        {listings.length > 0 ? (
                            <>
                                {listings.map((listing) => (
                            <article className="listing-card" key={listing.title}>
                                <div className={`listing-thumb ${listing.accent}`} aria-hidden="true"><span>{listing.type}</span></div>
                                <div><h4>{listing.title}</h4><p>{listing.area} · {listing.type}</p><strong>KSh {listing.price.toLocaleString()}<small> / month</small></strong><button className="specific-property-button" type="button" onClick={() => onSelectListing(listing)}>Specific Property</button></div>
                            </article>
                                ))}
                            </>
                        ) : countyListings.length > 0 ? (
                            <p className="no-listings">No homes in {locality} are under KSh {budget.toLocaleString()}. Increase your budget to see these listings.</p>
                        ) : <p className="no-listings">No sample listings are available for {locality} yet.</p>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StandardListingsMap