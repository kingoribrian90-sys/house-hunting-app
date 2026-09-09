import { useState } from 'react'

function TenantsPaymentWindow({ location, budget, onClose }) {
	const [paid, setPaid] = useState(false)

	function handlePayment(event) {
		event.preventDefault()
		setPaid(true)
	}

	return (
		<div className="payment-backdrop" role="presentation">
			<section className="payment-window" role="dialog" aria-modal="true" aria-labelledby="payment-title">
				<button className="close-payment" type="button" onClick={onClose} aria-label="Close payment window">x</button>
				<p className="recommendation-kicker">Tenant search</p>
				<h3 id="payment-title">Complete your house search</h3>
				{paid ? (
					<p className="form-success" role="status">Payment received. We will send matching homes in {location} shortly.</p>
				) : (
					<form className="payment-form" onSubmit={handlePayment}>
						<p>Search area: <strong>{location}</strong></p>
						<p>Monthly budget: <strong>KSh {budget.toLocaleString()}</strong></p>
						<label htmlFor="payment-email">Payment email</label>
						<input id="payment-email" type="email" placeholder="you@example.com" required />
						<button type="submit">Pay search fee</button>
					</form>
				)}
			</section>
		</div>
	)
}

export default TenantsPaymentWindow
