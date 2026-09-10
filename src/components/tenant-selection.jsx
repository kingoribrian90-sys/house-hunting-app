import { useState } from 'react'

import TenantsPaymentWindow from './tenants-payment-window'

import HouseTypePreview from './house-type-preview'


const budgetOptions = [
    {
        max: 30000,
        label: 'KSh 5,000 - KSh 30,000',
        houseTypes: ['Single room', 'Bedsitter'],
        locations: ['Kasarani', 'Roysambu', 'Embakasi'],
    },
    {
        max: 55000,
        label: 'KSh 35,000 - KSh 55,000',
        houseTypes: ['Bedsitter', 'One bedroom'],
        locations: ['Kilimani', 'Lavington', 'Kileleshwa'],
    },
    {
        max: 60000,
        label: 'KSh 55,000 - KSh 60,000',
        houseTypes: ['One bedroom', 'Two bedroom'],
        locations: ['Westlands', 'Riverside', 'Karen'],
    },
]

const houseTypeKeys = {
    'Single room': 'single',
    'Bedsitter': 'bedsitter',
    'One bedroom': 'one-bedroom',
    'Two bedroom': 'two-bedroom',
}

function TenantSelection() {
    const [tenantLocation, setTenantLocation] = useState('')
    const [tenantBudget, setTenantBudget] = useState(5000)
    const [paymentOpen, setPaymentOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const selectedBudget = budgetOptions.find((option) => tenantBudget <= option.max)

    function handleSubmit(event) {
        event.preventDefault()
        setPreviewOpen(true)
    }

    return (
        <>
            <h2 className="tenents-form-header">Tenant's search</h2>
            <form className="search-form tenant-search-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="tenant-location">Preferred location</label>
                    <input
                        id="tenant-location"
                        name="tenant-location"
                        type="text"
                        placeholder="e.g. Nairobi"
                        value={tenantLocation}
                        onChange={(event) => setTenantLocation(event.target.value)}
                        required
                    />
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
                        min="5000"
                        max="60000"
                        step="5000"
                        value={tenantBudget}
                        onChange={(event) => setTenantBudget(Number(event.target.value))}
                    />
                    <div className="slider-labels" aria-hidden="true">
                        <span>KSh 5k</span>
                        <span>KSh 60k</span>
                    </div>
                </div>
                <div className="recommendation" aria-live="polite">
                    <p className="recommendation-kicker">Homes available in this range</p>
                    <p><strong>House type:</strong> {selectedBudget.houseTypes.join(' or ')}</p>
                    <p><strong>Suggested locations:</strong> {selectedBudget.locations.join(', ')}</p>
                    <p><strong>Your location:</strong> {tenantLocation || 'Enter a location above'}</p>
                    <p className="budget-range-note">{selectedBudget.label}</p>
                </div>
                <button type="submit">Continue to payment</button>
            </form>
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
        </>
    )
}

export default TenantSelection