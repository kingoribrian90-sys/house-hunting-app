import { useState } from 'react'

import TenantsPaymentWindow from './tenants-payment-window'

const budgetOptions = [
    {
        max: 30000,
        label: 'KSh 15,000 - KSh 30,000',
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
        max: 100000,
        label: 'KSh 60,000 - KSh 100,000',
        houseTypes: ['One bedroom', 'Two bedroom'],
        locations: ['Westlands', 'Riverside', 'Karen'],
    },
]

function TenantSelection() {
    const [tenantLocation, setTenantLocation] = useState('')
    const [tenantBudget, setTenantBudget] = useState(30000)
    const [paymentOpen, setPaymentOpen] = useState(false)
    const selectedBudget = budgetOptions.find((option) => tenantBudget <= option.max)

    function handleSubmit(event) {
        event.preventDefault()
        setPaymentOpen(true)
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
                        min="15000"
                        max="100000"
                        step="5000"
                        value={tenantBudget}
                        onChange={(event) => setTenantBudget(Number(event.target.value))}
                    />
                    <div className="slider-labels" aria-hidden="true">
                        <span>KSh 15k</span>
                        <span>KSh 100k</span>
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