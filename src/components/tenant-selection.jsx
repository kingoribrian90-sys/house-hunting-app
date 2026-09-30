import { useState } from 'react'

import TenantsPaymentWindow from './tenants-payment-window'

import HouseTypePreview from './house-type-preview'
import LocationDetailsWindow from './location-details-window'
import StandardListingsMap from './standard-listings-map'
import { getMarketRecommendations } from '../rental-market'


const budgetOptions = [
    {
        max: 10000,
        label: 'KSh 3,000 - KSh 10,000',
        houseTypes: ['Single room', 'Bedsitter'],
    },
    {
        max: 20000,
        label: 'KSh 10,000 - KSh 20,000',
        houseTypes: ['Bedsitter', 'One bedroom'],
    },
    {
        max: 40000,
        label: 'KSh 20,000 - KSh 40,000',
        houseTypes: ['One bedroom', 'Two bedroom'],
    },
]

const urbanCountyOptions = [
    { county: 'Nairobi County', locations: ['Kasarani', 'Roysambu', 'Westlands', 'Kilimani', 'Embakasi'] },
    { county: 'Mombasa County', locations: ['Nyali', 'Bamburi', 'Kisauni', 'Mombasa Island', 'Likoni'] },
    { county: 'Kisumu County', locations: ['Milimani', 'Kondele', 'Mamboleo', 'Manyatta', 'Riat Hills'] },
    { county: 'Nakuru County', locations: ['Nakuru Town', 'Milimani', 'Section 58', 'Kiamunyi', 'Pipeline'] },
    { county: 'Kiambu County', locations: ['Ruiru', 'Thika', 'Kikuyu', 'Limuru', 'Kiambu Town'] },
    { county: 'Uasin Gishu County', locations: ['Eldoret CBD', 'Kapsoya', 'Pioneer', 'Elgon View', 'Annex'] },
    { county: 'Machakos County', locations: ['Machakos Town', 'Mavoko', 'Athi River', 'Syokimau', 'Kangundo Road'] },
    { county: 'Kajiado County', locations: ['Kitengela', 'Rongai', 'Ngong', 'Kiserian', 'Oloosuyian'] },
    { county: "Murang'a County", locations: ["Murang'a Town", 'Mukuyu', 'Gakoigo', 'Mumbi', 'Ihura'] },
    { county: 'Nyeri County', locations: ['Nyeri Town', 'Kamakwa', "King'ong'o", "Ruring'u", 'Kiganjo'] },
    { county: 'Kakamega County', locations: ['Kakamega Town', 'Milimani', 'Lurambi', 'Shieywe', 'Mahiakalo'] },
]

const houseTypeKeys = {
    'Single room': 'single',
    'Bedsitter': 'bedsitter',
    'One bedroom': 'one-bedroom',
    'Two bedroom': 'two-bedroom',
}

function TenantSelection() {
    // Store the tenant's search choices and the open follow-up windows.
    const [tenantLocation, setTenantLocation] = useState('')
    const [tenantLocality, setTenantLocality] = useState('')
    const [tenantBudget, setTenantBudget] = useState(5000)
    const [paymentOpen, setPaymentOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [standardListingsOpen, setStandardListingsOpen] = useState(false)
    const [selectedListing, setSelectedListing] = useState(null)
    // Derive the matching budget band, county data, and market guidance.
    const selectedBudget = budgetOptions.find((option) => tenantBudget <= option.max)
    const selectedCounty = urbanCountyOptions.find((option) => option.county === tenantLocation)
    const marketRecommendations = selectedCounty
        ? getMarketRecommendations(tenantLocation, tenantBudget, selectedBudget.houseTypes, selectedCounty.locations)
        : []

    function handleSubmit(event) {
        event.preventDefault()
        // Preview recommended home types before starting payment.
        setPreviewOpen(true)
    }

    return (
        <>
            <h2 className="tenents-form-header">Tenant's search</h2>
            <form className="search-form tenant-search-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="tenant-location">Preferred county</label>
                    <select
                        placeholder='e.g Nakuru county'
                        id="tenant-location"
                        name="tenant-location"
                        value={tenantLocation}
                        onChange={(event) => {
                            setTenantLocation(event.target.value)
                            setTenantLocality('')
                        }}
                        required
                    >
                        <option value="">Choose a county</option>
                        {urbanCountyOptions.map((option) => (
                            <option value={option.county} key={option.county}>{option.county}</option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="tenant-locality">Preferred locality</label>
                    <select
                        id="tenant-locality"
                        name="tenant-locality"
                        value={tenantLocality}
                        onChange={(event) => setTenantLocality(event.target.value)}
                        disabled={!selectedCounty}
                        required
                    >
                        <option value="">Choose a locality</option>
                        {selectedCounty?.locations.map((locality) => (
                            <option value={locality} key={locality}>{locality}</option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="budget-range">Set Budget Range</label>
                    <div className="budget-readout">
                        <strong>KSh {tenantBudget.toLocaleString()}</strong>
                        <span>per month</span>
                    </div>
                    <input
                        className="budget-slider"
                        id="budget-range"
                        name="budget-range"
                        type="range"
                        min="3000"
                        max="40000"
                        step="1000"
                        value={tenantBudget}
                        onChange={(event) => setTenantBudget(Number(event.target.value))}
                    />
                    {/* Label the slider endpoints so the range is easy to scan. */}
                    <div className="slider-labels" aria-hidden="true">
                        <span>KSh 3k</span>
                        <span>KSh 40k</span>
                    </div>
                </div>
                <div className="recommendation" aria-live="polite">
                    <p className="recommendation-kicker">Homes available in this range</p>
                    <p><strong>House types:</strong> {selectedBudget.houseTypes.join(' or ')}</p>
                    <p><strong>Your county:</strong> {tenantLocation || 'Select a county above'}</p>
                    <p className="budget-range-note">{selectedBudget.label}</p>
                    {marketRecommendations.length > 0 && (
                        <div className="market-recommendations">
                            {marketRecommendations.map((recommendation) => (
                                <article className={`market-recommendation${recommendation.fitsBudget ? '' : ' outside-budget'}`} key={`${recommendation.location}-${recommendation.houseType}`}>
                                    <div><strong>{recommendation.location}</strong><span>{recommendation.houseType}</span></div>
                                    <strong>{recommendation.averageRentRange}</strong>
                                    <small>{recommendation.note}</small>
                                </article>
                            ))}
                        </div>
                    )}
                    <button
                        className="location-details-trigger"
                        type="button"
                        onClick={() => setStandardListingsOpen(true)}
                        disabled={!tenantLocality}
                    >
                        Browse Listings on Map
                    </button>
                </div>
                <button type="submit">Continue to payment</button>
            </form>
            {/* Move from recommendations to payment after the preview. */}
            {previewOpen && (
                <HouseTypePreview
                    houseTypes={selectedBudget.houseTypes.map((type) => houseTypeKeys[type])}
                    onClose={() => setPreviewOpen(false)}
                    onContinue={() => {
                        setPreviewOpen(false)
                        setPaymentOpen(true)
                    }}
                />
            )}
            {paymentOpen && (
                <TenantsPaymentWindow
                    location={tenantLocation}
                    budget={tenantBudget}
                    onClose={() => setPaymentOpen(false)}
                />
            )}
            {standardListingsOpen && !selectedListing && (
                <StandardListingsMap
                    location={tenantLocation}
                    locality={tenantLocality}
                    budget={tenantBudget}
                    suggestedLocations={selectedCounty.locations}
                    recommendations={marketRecommendations}
                    onSelectListing={setSelectedListing}
                    onClose={() => {
                        setSelectedListing(null)
                        setStandardListingsOpen(false)
                    }}
                />
            )}
            {selectedListing && (
                <LocationDetailsWindow
                    listing={selectedListing}
                    onClose={() => setSelectedListing(null)}
                    onBackToMap={() => setSelectedListing(null)}
                />
            )}
        </>
    )
}

export default TenantSelection