import { useState } from 'react'
import HouseTypePreview from './house-type-preview'

function HouseOwnerRegistration() {
	const [selectedHouseType, setSelectedHouseType] = useState('single')
	const [previewOpen, setPreviewOpen] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		setPreviewOpen(true)
	}

	return (
		<>
			<h2 className="house-owner-form-header">House owner's search</h2>
			<form className="search-form" onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="owner-location">Preferred location</label>
					<input id="owner-location" name="location" type="text" placeholder="e.g. Nairobi" required style={{ border: '1px solid #ccc', padding: '8px', color: '#f5f5dc' }} />
				</div>

				<div className="form-field">
					<label htmlFor="housetype">Preferred housetype</label>
					<select name="housetype" id="housetype" value={selectedHouseType} onChange={(event) => setSelectedHouseType(event.target.value)} required>
						<option value="single">Single</option>
						<option value="bedsitter">Bedsitter</option>
						<option value="one-bedroom">One bedroom</option>
						<option value="two-bedroom">Two bedroom</option>
					</select>
				</div>

				<div className="form-field">
					<label htmlFor="electricity-billing-mode" style={{fontWeight: 'bold'}}>Select Utility Billing Mode</label>
					<label htmlFor="electricity-billing-mode">Electricity</label>
					<select name="electricity-billing-mode" id="electricity-billing-mode" required>
						<option value="prepaid">Prepaid</option>
						<option value="postpaid">Postpaid</option>
						<option value="included">Included</option>
					</select>
					<label htmlFor="water-billing-mode">Water</label>
					<select name="water-billing-mode" id="water-billing-mode">
						<option value="prepaid">Prepaid</option>
						<option value="postpaid">Postpaid</option>
						<option value="included">Included</option>
					</select>
				</div>

				<div className="form-field">
					<label htmlFor="budget">Monthly budget</label>
					<input id="budget" name="budget" type="number" min="0" placeholder="e.g. 50000" required />
				</div>

				<div className="form-field">
					<label htmlFor="owner-email">Email address</label>
					<input id="owner-email" name="email" type="email" placeholder="you@example.com" required />
				</div>
				<button type="submit">Find a home</button>
			</form>
			{previewOpen && <HouseTypePreview houseType={selectedHouseType} onClose={() => setPreviewOpen(false)} />}
		</>
	)
}

export default HouseOwnerRegistration

