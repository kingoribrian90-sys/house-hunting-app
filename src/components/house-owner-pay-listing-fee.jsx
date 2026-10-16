import { useState } from 'react'
import { api } from '../api'
// This form submits the owner's M-Pesa listing fee request to the server.
function HouseOwnerPayListingFee({ onClose, onPaymentRequestSubmitted }) {
	const [requestSubmitted, setRequestSubmitted] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	// Record payment through the listing-fee endpoint before completing the flow.
	async function handlePayment(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		setSubmitting(true)
		setErrorMessage('')

		try {
			await api.post('/v1/payments/listing-fee', {
				paymentMethod: 'mpesa',
				safaricomNumber: formData.get('phoneNumber'),
				emailAddress: formData.get('email'),
			})
			setRequestSubmitted(true)
			if (typeof onPaymentRequestSubmitted === 'function') {
				onPaymentRequestSubmitted()
			}
		} catch (error) {
			setErrorMessage(error.message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="payment-backdrop" role="presentation" onClick={onClose}>
			<section
				className="payment-window"
				role="dialog"
				aria-modal="true"
				aria-labelledby="listing-fee-title"
				onClick={(event) => event.stopPropagation()}
			>
                <button className="close-payment" type="button" onClick={onClose} aria-label="Close listing fee payment window">x</button>
				<p className="recommendation-kicker">House owner listing</p>
				<h3 id="listing-fee-title">Request listing fee payment</h3>

				{requestSubmitted ? (
				    <p className="form-success" role="status">Your M-Pesa payment request was submitted and is awaiting provider confirmation. The listing fee has not yet been marked as paid.</p>
				) : (
					<form className="payment-form" onSubmit={handlePayment}>
                        <p>Listing fee: <strong>KSh 500</strong></p>
                        <p>M-Pesa payment requests are recorded as pending until a provider confirms payment.</p>
                        <input name="phoneNumber" type="tel" placeholder="e.g. 0712 345 678" required />
				        <input name="email" type="email" placeholder="you@example.com" required />
				        {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Submitting request…' : 'Request M-Pesa payment'}
                        </button>
					</form>
				)}
			</section>
		</div>
	)
}

export default HouseOwnerPayListingFee
