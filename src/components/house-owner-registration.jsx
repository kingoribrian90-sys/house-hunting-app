import { useState } from 'react'
import HouseTypePreview from './house-type-preview'
import HouseOwnerPayListingFee from './house-owner-pay-listing-fee'

// Define the counties and corresponding localities that the owner may choose from.
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

// This form collects an owner's intended listing area and home preferences before opening the preview/payment flow.
function HouseOwnerRegistration({ onListingSubmitted }) {
	// Keep the selected home type and advanced form state in local React state.
	const [selectedHouseType, setSelectedHouseType] = useState('single')
	const [preferredLocation, setPreferredLocation] = useState('')
	const [preferredLocality, setPreferredLocality] = useState('')
	const [previewOpen, setPreviewOpen] = useState(false)
	const [listingFeeOpen, setListingFeeOpen] = useState(false)
	const selectedCounty = urbanCountyOptions.find((option) => option.county === preferredLocation)

	// After the browser validates the form, show the sample property preview.
	function handleSubmit(event) {
		event.preventDefault()
		setPreviewOpen(true)
	}

	return (
		<>
			<h2 className="house-owner-form-header">House owner's search</h2>
			<form className="search-form" onSubmit={handleSubmit}>
				{/* Collect the county and locality for the prospective listing. */}
				<div className="form-field">
					<label htmlFor="owner-location">Preferred county</label>
					<select
						id="owner-location"
						name="location"
						value={preferredLocation}
						onChange={(event) => {
							setPreferredLocation(event.target.value)
							setPreferredLocality('')
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
					<label htmlFor="owner-locality">Preferred locality</label>
					<select
						id="owner-locality"
						name="locality"
						value={preferredLocality}
						onChange={(event) => setPreferredLocality(event.target.value)}
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
			{/* Display the selected house type without leaving the form. */}
			{previewOpen && (
				<HouseTypePreview
					houseType={selectedHouseType}
					onClose={() => setPreviewOpen(false)}
					onReturnToSearch={() => setPreviewOpen(false)}
					onPayListingFee={() => {
						setPreviewOpen(false)
						setListingFeeOpen(true)
					}}
				/>
			)}
			{listingFeeOpen && (
				<HouseOwnerPayListingFee
					onClose={() => setListingFeeOpen(false)}
					onPaymentSuccess={() => {
						if (typeof onListingSubmitted === 'function') {
							onListingSubmitted()
						}
					}}
				/>
			)}
		</>
	)
}

export default HouseOwnerRegistration

