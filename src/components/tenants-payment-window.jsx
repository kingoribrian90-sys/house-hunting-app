import { useState } from 'react'
import { api } from '../api'

// Show a utility estimate for the selected area so the tenant can understand moving costs.
export function UtilityPaymentBreakdown({ location, utilities }) {
	const utilityTotal = utilities.reduce((sum, utility) => sum + utility.amount, 0)

	return (
		<section className="utility-estimates" aria-labelledby="utility-breakdown-title">
			<h4 id="utility-breakdown-title">Estimated monthly utilities</h4>
			<p className="utility-estimate-note">Market-based estimates for {location}; confirm billing modes and provider rates with the owner.</p>
			{utilities.map((utility) => (
				<div className="utility-estimate-row" key={utility.label}>
					<span><strong>{utility.label}</strong><small>{utility.detail}</small></span>
					<strong>KSh {utility.amount.toLocaleString()}</strong>
				</div>
			))}
			<div className="utility-estimate-total"><span>Estimated monthly total</span><strong>KSh {utilityTotal.toLocaleString()}</strong></div>
			<p className="utility-estimate-note">Optional services are included in this estimate; actual usage and inclusions may vary.</p>
		</section>
	)
}

// This payment modal lets the tenant purchase a search pass and confirms the completed transaction.
function TenantsPaymentWindow({ location, budget, onClose }) {
	// Track payment completion and the pass selected by the tenant.
	const [paid, setPaid] = useState(false)
	const [subscription, setSubscription] = useState('monthly')
	const [submitting, setSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const subscriptionOptions = [
		{ value: 'daily', label: 'Daily pass', description: 'Search for 24 hours', divisor: 30 },
		{ value: 'weekly', label: 'Weekly pass', description: 'Search for 7 days', divisor: 4 },
		{ value: 'monthly', label: 'Monthly pass', description: 'Search for 30 days', divisor: 1 },
	]
	// Calculate the pass price from the monthly search budget.
	const selectedSubscription = subscriptionOptions.find((option) => option.value === subscription)
	const passAmount = budget / selectedSubscription.divisor
	const formattedPassAmount = passAmount.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	async function handlePayment(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		setSubmitting(true)
		setErrorMessage('')

		try {
			await api.post('/payments/search-pass', {
				location,
				budget,
				subscription,
				amount: passAmount,
				currency: 'KES',
				email: formData.get('email'),
			})
			setPaid(true)
		} catch (error) {
			setErrorMessage(error.message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="payment-backdrop" role="presentation">
			<section className="payment-window" role="dialog" aria-modal="true" aria-labelledby="payment-title">
				<button className="close-payment" type="button" onClick={onClose} aria-label="Close payment window">x</button>
				<p className="recommendation-kicker">Tenant search</p>
				<h3 id="payment-title">Complete your house search</h3>
				{/* Replace the payment form with a confirmation after payment. */}
				{paid ? (
					<p className="form-success" role="status">Your {subscription} pass payment of KSh {formattedPassAmount} was received. We will send matching homes in {location} shortly.</p>
				) : (
					<form className="payment-form" onSubmit={handlePayment}>
						<p>Search area: <strong>{location}</strong></p>
						<p>Monthly budget: <strong>KSh {budget.toLocaleString()}</strong></p>
						<p>Pass amount: <strong>KSh {formattedPassAmount}</strong></p>
						<fieldset className="subscription-options">
							<legend>Choose your subscription pass</legend>
							{subscriptionOptions.map((option) => (
								<label className={`subscription-option${subscription === option.value ? ' selected' : ''}`} key={option.value}>
									<input
										type="radio"
										name="subscription"
										value={option.value}
										checked={subscription === option.value}
										onChange={(event) => setSubscription(event.target.value)}
									/>
									<span>
										<strong>{option.label}</strong>
										<small>{option.description}</small>
									</span>
								</label>
							))}
						</fieldset>
						<label htmlFor="payment-email">Payment email</label>
						<input id="payment-email" name="email" type="email" placeholder="you@example.com" required />
						{errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
						<button type="submit" disabled={submitting}>
							{submitting ? 'Processing payment…' : `Pay KSh ${formattedPassAmount}`}
						</button>
					</form>
				)}
			</section>
		</div>
	)
}

export default TenantsPaymentWindow
